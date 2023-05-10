import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyCentralization } from '../../services/api';
import { Container } from '../modal/style';

const CentralizationModal = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);

    const { handleSubmit } = useForm();
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { centralization, setCentralization } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(async() => {
            try {
                const response = await ApplyCentralization();
                if (!response) {
                    setApplicationStatus('Failed to apply centralization');
                }
                setApplicationStatus('Centralization applied');
                setCloudFolderName(response);
            } catch (error) {
                console.error(error);
                setApplicationStatus('Failed to apply centralization');
            }
            
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                
                return newLoadings;
            });
        }, 2000)
    }

    const handleCloseModal = () => {
      setCentralization({
        modalOpen: false,
      });
    };

    return(
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
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Centralization</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <p>Are you sure you want to set centralization?</p>
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

export default CentralizationModal;