import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyVoxelGrid } from '../../services/api';
import { Container } from '../modal/style';

const VoxelGridModal = ({ setCloudFolderName }) => {

    const voxelGridSchema = yup.object().shape({
        leafSize: yup.number().typeError('A number is required')
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(voxelGridSchema) });
    const { loadings, setLoadings } = useContext(GlobalContext);
    const { voxelGrid, setVoxelGrid } = useContext(GlobalContext);
    const { setApplicationStatus } = useContext(GlobalContext);
    const { sessionID, cloudFolderName } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            voxelGridSchema.validate(data)
            .then( async() => {
                try {
                    const response = await ApplyVoxelGrid({
                      session: sessionID,
                      uuid: cloudFolderName,
                      leaf: data.leafSize,
                    });
                    if (!response) {
                        setApplicationStatus('Failed to apply voxel grid');
                    }
                    setApplicationStatus('Voxel grid applied');
                    setCloudFolderName(response);
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply voxel grid');
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
        setVoxelGrid({
            modalOpen: false,
        });
    };

    return(
      <Modal
      open={voxelGrid.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
      >
      <Container>
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Voxel Grid Filter</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <label htmlFor='leafSize'>Leaf Size:</label>
                <input 
                type='text' 
                id='leafSize' 
                placeholder='float'
                {...register("leafSize", { value: `${voxelGrid.leafSize}` })}
                />
                <Tooltip placement="right" title={'This field set the minimum distance between neighboring points in the cloud equally.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            <span className='error'>{errors.leafSize?.message}</span>
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

export default VoxelGridModal;