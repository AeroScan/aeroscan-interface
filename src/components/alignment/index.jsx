import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyAlignment } from '../../services/api';
import { Container } from '../modal/style';

const AlignmentModal = () => {
  const { handleSubmit } = useForm();
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { alignment, setAlignment } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async () => {
    closeModal();
    setApplicationStatus({
      status: "busy",
      message: "Applying alignment",
    });
    setGlobalLoading(true);
    try {
      const response = await ApplyAlignment({ session: sessionID, uuid: cloudFolderName });
      if (!response) {
        setApplicationStatus({
          status: "error",
          message: "Failed to apply alignment",
        });
      } else {
        setApplicationStatus({
          status: 'success',
          message: 'Alignment applied',
        });
        setCloudFolderName(response);
      }
      setGlobalLoading(false);
    } catch (error) {
      console.error(error);
      setApplicationStatus({
        status: 'error',
        message: 'Failed to apply alignment',
      });
      setGlobalLoading(false);
    }
  }

  const closeModal = () => {
    setAlignment({
      modalOpen: false
    })
  }

  return (
    <Modal
      open={alignment.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Alignment</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <p>Are you sure you want to set alignment?</p>
          </div>
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

export default AlignmentModal;