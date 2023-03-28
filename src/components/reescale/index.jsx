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

const ReescaleModal = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);
    const reescaleSchema = yup.object().shape({
        scale: yup.number().typeError('A number is required')
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(reescaleSchema) });
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { reescaleModalOpen, setReescaleModalOpen } = useContext(GlobalContext);

    const onSubmit = (data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });

        setTimeout(() => {
            reescaleSchema.validate(data)
            .then( async() => {
                try {
                    const response = await ApplyReescale({ factor: data.scale });
                    if (!response) {
                        setApplicationStatus('Failed to apply reescale');
                    }
                    setApplicationStatus('Reescale applied');
                    setCloudFolderName(response);
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply reescale');
                }
            })
            .catch(err => {
                console.log(err);
            });
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                
                return newLoadings;
            });
        }, 2000)
    }

    const handleCloseModal = () => {
        setReescaleModalOpen(null);
    };
    
    return(
    <Modal
      open={reescaleModalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Reescale</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <label htmlFor='scale'>Scale:</label>
                <input 
                type='text' 
                id='scale' 
                placeholder='float'
                {...register("scale")}
                />
                <Tooltip placement="right" title={'This field update the scale of all cloud points.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            <span className='error'>{errors.scale?.message}</span>
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

export default ReescaleModal;