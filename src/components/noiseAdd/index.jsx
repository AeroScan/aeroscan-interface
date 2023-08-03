import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyNoiseAdd } from '../../services/api';
import { Container } from '../modal/style';
import tooltipsTexts from '../../utils/tooltips';

const NoiseAddModal = () => {
  const noiseAddSchema = yup.object().shape({
    limit: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(noiseAddSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { noiseAdd, setNoiseAdd } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying noise add',
    });
    setGlobalLoading(true);
    noiseAddSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyNoiseAdd({
            session: sessionID,
            uuid: cloudFolderName,
            limit: data.limit,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply noise add',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Noise add applied',
            });
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply noise add',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setNoiseAdd({
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={noiseAdd.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Noise Add</h1>
        <h2>{tooltipsTexts.noise_add.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='limit'>Limit:</label>
            <input
              type='text'
              id='limit'
              placeholder='float'
              {...register("limit")}
            />
            <Tooltip placement="left" title={tooltipsTexts.noise_add.parameters.limit.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.limit?.message}</span>
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

export default NoiseAddModal;