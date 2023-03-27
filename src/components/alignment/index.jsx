import React, { useContext } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyAlignment } from '../../services/api';
import { Container } from '../modal/style';

const AlignmentModal = ({ setCloudFolderName }) => {
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { setApplicationStatus } = useContext(GlobalContext);
    const { alignmentModalOpen, setAlignmentModalOpen } = useContext(GlobalContext);

    const handleSubmit = async() => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(async() => {
            try {
                const response = await ApplyAlignment();
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
        setAlignmentModalOpen(false);
    }

    return(
        <Modal 
            open={alignmentModalOpen} 
            footer={null} width={'40%'} 
            closable={false} 
            maskClosable={true}
            centered
            destroyOnClose
        >
            <Container>
                <CloseOutlined className='closeIcon' onClick={handleCloseModal}/>
                <h1>Alignment</h1>
                <div className="buttons-container">
                    <Button loading={loadings[0]} onClick={() => handleSubmit()}>
                        Process
                    </Button>
                    <Button className='cancel' onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </div>
            </Container>
        </Modal>
    );
}

export default AlignmentModal;