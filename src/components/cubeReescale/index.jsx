import React, { useState, useRef, useContext } from 'react';
import Draggable from 'react-draggable'; 
import tooltipsTexts from "../../utils/tooltips";
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyCubeReescale } from '../../services/api';
import { ModalHeader, AntModal } from '../modal/style';

const CubeReescaleModal = () => {
  const cubeReescaleSchema = yup.object().shape({
    factor: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(cubeReescaleSchema) });
  const { setApplicationStatus, setEfficientRansacApplied } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { cubeReescale, setCubeReescale } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);
  const { efficientRansac, setEfficientRansac } = useContext(GlobalContext);
  const { voxelGrid, setVoxelGrid } = useContext(GlobalContext);

  const draggleRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
    
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onSubmit = async (data) => {
    closeModal();
    setApplicationStatus({
      status: 'busy',
      message: 'Applying cube reescale',
    });
    setGlobalLoading(true);
    cubeReescaleSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyCubeReescale({
            session: sessionID,
            uuid: cloudFolderName,
            factor: data.factor
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply cube reescale',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Cube reescale applied',
            });
            if (response.data && response.data.params_suggestion) {
              const params = JSON.parse(response.data.params_suggestion);
              setEfficientRansac({
                ...efficientRansac,
                clusterEpsilon: params.ransac_cepsilon,
                epsilon: params.ransac_epsilon,
              });
              setVoxelGrid({
                ...voxelGrid,
                leafSize: params.voxel,
              });
            }
            setEfficientRansacApplied(false);
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply cube reescale',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setCubeReescale({
      ...cubeReescale,
      modalOpen: false,
    });
  };

  return (
    <AntModal
      title={
        <ModalHeader
        onMouseOver={() => disabled && setDisabled(false)}
        onMouseOut={() => setDisabled(true)}
        >
          <CloseOutlined className="closeIcon" onClick={closeModal} />
          <h1>Cube Reescale</h1>
        </ModalHeader>
      }
      open={cubeReescale.modalOpen}
      onCancel={closeModal}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <div>
        <h2>{tooltipsTexts.cube_rescale.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='factor'>Factor:</label>
            <input
              type='text'
              id='factor'
              placeholder={cubeReescale.factor}
              {...register("factor")}
            />
            <Tooltip placement="left" title={tooltipsTexts.cube_rescale.parameters.factor.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.factor?.message}</span>
        </form>
        <div className="buttons-container">
          <Button htmlType="submit" form="modalForm">
            Process
          </Button>
          <Button className="cancel" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </AntModal>

  );
}

export default CubeReescaleModal;