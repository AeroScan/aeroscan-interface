import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyAlignment } from '../../services/api';
import { Container } from '../modal/style';

const AlignmentModal = ({ setCloudFolderName }) => {
  
    const { handleSubmit } = useForm();
    const { setApplicationStatus } = useContext(GlobalContext);
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { alignment, setAlignment } = useContext(GlobalContext);
    const { sessionID, cloudFolderName } = useContext(GlobalContext);

    const onSubmit = async() => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(async() => {
            try {
              const response = await ApplyAlignment({ session: sessionID, uuid: cloudFolderName });
              if (!response) {
                setApplicationStatus('Failed to apply alignment');
              }
              setApplicationStatus('Alignment applied');
              setCloudFolderName(response);
            } catch (error) {
                console.error(error);
                setApplicationStatus('Failed to apply alignment');
            }
            
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                
                return newLoadings;
            });
        }, 2000);
    }

    const handleCloseModal = () => {
      setAlignment({
        modalOpen: false
      })
    }

    return(
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
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Alignment</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <p>Are you sure you want to set alignment?</p>
            </div>
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

export default AlignmentModal;