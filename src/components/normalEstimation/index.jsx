import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyNormalEstimation } from '../../services/api';
import { Container } from '../modal/style';
import tooltipsTexts from '../../utils/tooltips';

const NormalEstimationModal = () => {
  const normalEstimationSchema = yup.object().shape({
    radius: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(normalEstimationSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { normalEstimation, setNormalEstimation } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying normal estimation',
    });
    setGlobalLoading(true);
    normalEstimationSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyNormalEstimation({
            session: sessionID,
            uuid: cloudFolderName,
            radius: data.radius,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply normal estimation',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Normal estimation applied',
            });
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply normal estimation',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setNormalEstimation({
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={normalEstimation.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Normal Estimation</h1>
        <h2>{tooltipsTexts.normal_estimation.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='radius'>Radius:</label>
            <input
              type='text'
              id='radius'
              placeholder='float'
              {...register("radius")}
            />
            <Tooltip placement="left" title={tooltipsTexts.normal_estimation.parameters.radius.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.radius?.message}</span>
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

export default NormalEstimationModal;