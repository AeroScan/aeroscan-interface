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

const NoiseAddModal = ({ setCloudFolderName }) => {

    
    const noiseAddSchema = yup.object().shape({
        limit: yup.number().typeError('A number is required')
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(noiseAddSchema) });
    const { setApplicationStatus } = useContext(GlobalContext);
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { noiseAdd, setNoiseAdd } = useContext(GlobalContext);
    const { sessionID, cloudFolderName } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            noiseAddSchema.validate(data)
            .then( async() => {
                try {
                  const response = await ApplyNoiseAdd({
                    session: sessionID,
                    uuid: cloudFolderName,
                    limit: data.limit,
                  });
                  if (!response) {
                    setApplicationStatus('Failed to apply noise add');

                  }
                  setApplicationStatus('Noise add applied');
                  setCloudFolderName(response);
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply noise add');
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
        setNoiseAdd({
            modalOpen: false,
        });
    };

    return(
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
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Noise Add</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <label htmlFor='limit'>Limit:</label>
                <input 
                type='text' 
                id='limit' 
                placeholder='float'
                {...register("limit", { value: `${noiseAdd.limit}` })}
                />
                <Tooltip placement="right" title={'The select set the maximum value of noise to add.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            <span className='error'>{errors.limit?.message}</span>
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

export default NoiseAddModal;