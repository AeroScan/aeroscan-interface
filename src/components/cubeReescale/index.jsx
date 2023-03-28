import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyCubeReescale } from '../../services/api';
import { Container } from '../modal/style';

const CubeReescaleModal = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);
    const cubeReescaleSchema = yup.object().shape({
        factor: yup.number().typeError('A number is required')
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(cubeReescaleSchema) });
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { cubeReescaleModalOpen, setCubeReescaleModalOpen } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            cubeReescaleSchema.validate(data)
            .then( async() => {
                try {
                    const response = await ApplyCubeReescale({ factor: data.factor });
                    if (!response) {
                        setApplicationStatus('Failed to apply cube reescale');
                            
                    }
                    setApplicationStatus('Cube reescale applied');
                    setCloudFolderName(response);
                        
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply cube reescale');
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
        setCubeReescaleModalOpen(false);
    };

    return(
    <Modal
      open={cubeReescaleModalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Cube Reescale</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <label htmlFor='factor'>Factor:</label>
                <input 
                type='text' 
                id='factor' 
                placeholder='float'
                {...register("factor")}
                />
                <Tooltip placement="right" title={'The select set the factor for rescaling the cloud. .'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            <span className='error'>{errors.factor?.message}</span>
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

export default CubeReescaleModal;