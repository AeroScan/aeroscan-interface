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

const StatisticalRemovalModal = ({ setCloudFolderName }) => {

  const statisticalRemovalSchema = yup.object().shape({
    mean: yup.number().typeError('A number is required'),
    standardDeviation: yup.number().typeError('A number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(statisticalRemovalSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { loadings, setLoadings } = useContext(GlobalContext);
  const { statisticalRemoval, setStatisticalRemoval } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(() => {
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
              setApplicationStatus('Failed to apply statistical removal');
            }
            setApplicationStatus('Statistical removal applied');
            setCloudFolderName(response);
          } catch (error) {
            console.error(error);
            setApplicationStatus('Failed to apply statistical removal');
          }
      })
      .catch(err => {
        console.log(err);
      });
    });
  };

  const handleCloseModal = () => {
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
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Statistical Removal</h1>
    <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
      <div className='formContainer'>
        <label htmlFor='mean'>Mean:</label>
        <input
          type='text'
          id='mean'
          placeholder='float'
          {...register('mean', { value: `${statisticalRemoval.mean}` })}
        />
        <Tooltip placement="right" title={'This field set the average.'} overlayStyle={{ fontSize: '3rem' }}>
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
        <Tooltip placement="right" title={'This field set the standard deviation.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.standardDeviation?.message}</span>
    </form>
        <div className="buttons-container">
          <Button loading={loadings[0]} htmlType="submit" form="modalForm">
            Process
          </Button>
          <Button className="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Container>
    </Modal>
  );
}

export default StatisticalRemovalModal;