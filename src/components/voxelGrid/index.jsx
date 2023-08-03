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
import tooltipsTexts from '../../utils/tooltips';

const VoxelGridModal = () => {

  const voxelGridSchema = yup.object().shape({
    leafSize: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(voxelGridSchema) });
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { voxelGrid, setVoxelGrid } = useContext(GlobalContext);
  const { setApplicationStatus, setEfficientRansacApplied } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying voxel grid',
    });
    setGlobalLoading(true);
    voxelGridSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyVoxelGrid({
            session: sessionID,
            uuid: cloudFolderName,
            leaf: data.leafSize,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply voxel grid',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Voxel grid applied',
            });
            setEfficientRansacApplied(false);
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply voxel grid',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setVoxelGrid({
      modalOpen: false,
    });
  };

  return (
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
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Voxel Grid Filter</h1>
        <h2>{tooltipsTexts.voxel_grid.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='leafSize'>Leaf Size:</label>
            <input
              type='text'
              id='leafSize'
              placeholder='float'
              {...register("leafSize")}
            />
            <Tooltip placement="left" title={tooltipsTexts.voxel_grid.parameters.leaf_size.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.leafSize?.message}</span>
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

export default VoxelGridModal;