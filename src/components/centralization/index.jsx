import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyCentralization } from '../../services/api';
import { Container } from '../modal/style';

const CentralizationModal = () => {
  const { handleSubmit } = useForm();
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { centralization, setCentralization } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying centralization',
    });
    setGlobalLoading(true);
    try {
      const response = await ApplyCentralization({ session: sessionID, uuid: cloudFolderName });
      if (!response) {
        setApplicationStatus({
          status: 'error',
          message: 'Failed to apply centralization',
        });
      } else {
        setApplicationStatus({
          status: 'success',
          message: 'Centralization applied',
        });
        setCloudFolderName(response);
      }
      setGlobalLoading(false);
    } catch (error) {
      console.error(error);
      setApplicationStatus({
        status: 'error',
        message: 'Failed to apply centralization',
      });
      setGlobalLoading(false);
    }
  }

  const closeModal = () => {
    setCentralization({
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={centralization.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Centralization</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <p>Are you sure you want to set centralization?</p>
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

export default CentralizationModal;