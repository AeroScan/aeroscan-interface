import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyStatisticalOutlierRemoval } from '../../services/api';
import { Container } from '../modal/style';
import tooltipsTexts from '../../utils/tooltips';

const StatisticalRemovalModal = () => {

  const statisticalRemovalSchema = yup.object().shape({
    mean: yup.number().typeError('A number is required'),
    standardDeviation: yup.number().typeError('A number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(statisticalRemovalSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { statisticalRemoval, setStatisticalRemoval } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying statistical removal'
    });
    setGlobalLoading(true);
    statisticalRemovalSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyStatisticalOutlierRemoval({
            session: sessionID,
            uuid: cloudFolderName,
            mean: data.mean,
            std: data.standardDeviation,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply statistical removal',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Statistical removal applied',
            });
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply statistical removal',
          });
          setGlobalLoading(false);
        }
      })
  };

  const closeModal = () => {
    setStatisticalRemoval({
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={statisticalRemoval.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Statistical Removal</h1>
        <h2>{tooltipsTexts.statistical_removal.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='mean'>Mean:</label>
            <input
              type='text'
              id='mean'
              placeholder='float'
              {...register('mean')}
            />
            <Tooltip placement="left" title={tooltipsTexts.statistical_removal.parameters.mean.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.mean?.message}</span>
          <div className='formContainer'>
            <label htmlFor='standardDeviation'>Standard Deviation:</label>
            <input
              type='text'
              id='standardDeviation'
              placeholder='float'
              {...register('standardDeviation')}
            />
            <Tooltip placement="left" title={tooltipsTexts.statistical_removal.parameters.standard_deviation.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.standardDeviation?.message}</span>
        </form>
        <div className="buttons-container">
          <Button htmlType="submit" form="modalForm">
            Process
          </Button>
          <Button className="cancel" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </Container>
    </Modal>
  );
}

export default StatisticalRemovalModal;