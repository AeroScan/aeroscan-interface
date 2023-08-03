import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyReescale } from '../../services/api';
import { Container } from '../modal/style';
import tooltipsTexts from '../../utils/tooltips';

const ReescaleModal = () => {
  const reescaleSchema = yup.object().shape({
    scale: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(reescaleSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { reescale, setReescale } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying reescale',
    });
    setGlobalLoading(true);
    reescaleSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyReescale({
            session: sessionID,
            uuid: cloudFolderName,
            factor: data.scale,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply reescale',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Reescale applied',
            });
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply reescale',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setReescale({
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={reescale.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Reescale</h1>
        <h2>{tooltipsTexts.rescale.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='scale'>Scale:</label>
            <input
              type='text'
              id='scale'
              placeholder='float'
              {...register("scale")}
            />
            <Tooltip placement="left" title={tooltipsTexts.rescale.parameters.factor.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.scale?.message}</span>
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

export default ReescaleModal;