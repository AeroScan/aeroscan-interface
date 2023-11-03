import React, { useState, useRef, useContext } from "react";
import Draggable from "react-draggable"; 
import tooltipsTexts from "../../utils/tooltips";
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "../../context";
import { ApplyNoiseAdd } from "../../services/api";
import { ModalHeader, AntModal } from "../modal/style";

const NoiseAddModal = () => {
  const noiseAddSchema = yup.object().shape({
    limit: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(noiseAddSchema) });
  const { setApplicationStatus, setEfficientRansacApplied } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { noiseAdd, setNoiseAdd } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);
  const { efficientRansac, setEfficientRansac } = useContext(GlobalContext);
  const { voxelGrid, setVoxelGrid } = useContext(GlobalContext);
  const { normalEstimation, setNormalEstimation } = useContext(GlobalContext);

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
      message: 'Applying noise add',
    });
    setGlobalLoading(true);
    noiseAddSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyNoiseAdd({
            session: sessionID,
            uuid: cloudFolderName,
            limit: data.limit,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply noise add',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Noise add applied',
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
              setNormalEstimation({
                ...normalEstimation,
                radius: params.normal,
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
            message: 'Failed to apply noise add',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setNoiseAdd({
      ...noiseAdd,
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
          <h1>Noise Add</h1>
        </ModalHeader>
      }
      open={noiseAdd.modalOpen}
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
        <h2>{tooltipsTexts.noise_add.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='limit'>Limit:</label>
            <input
              type='text'
              id='limit'
              placeholder={noiseAdd.limit}
              {...register("limit")}
            />
            <Tooltip placement="left" title={tooltipsTexts.noise_add.parameters.limit.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.limit?.message}</span>
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

export default NoiseAddModal;