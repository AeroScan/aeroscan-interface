import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyCentralization } from '../../services/api';
import { Container } from '../modal/style';

const CentralizationModal = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { centralizationModalOpen, setCentralizationModalOpen } = useContext(GlobalContext);

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
        setCentralizationModalOpen(false);
    };

    return(
    <Modal
      open={centralizationModalOpen}
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
                {/* <label htmlFor='scale'>Scale:</label>
                <input 
                type='text' 
                id='scale' 
                placeholder='float'
                {...register("scale", { required: 'Invalid scale' })}
                aria-invalid={errors.scale ? "true" : "false"}
                />
                <Tooltip placement="right" title={'This field update the scale of all cloud points.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip> */}
            </div>
            {/* <span className='error'>{errors.email.type.custom}</span> */}
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