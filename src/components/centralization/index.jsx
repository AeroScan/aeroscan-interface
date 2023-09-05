import React, { useState, useRef, useContext } from 'react';
import Draggable from 'react-draggable'; 
import tooltipsTexts from '../../utils/tooltips';
import { useForm } from "react-hook-form";
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyCentralization } from '../../services/api';
import { ModalHeader, AntModal } from '../modal/style';

const CentralizationModal = () => {
  const { handleSubmit } = useForm();
  const { setApplicationStatus, setEfficientRansacApplied } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { centralization, setCentralization } = useContext(GlobalContext);
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
      message: 'Applying centralization',
    });
    setGlobalLoading(true);
    try {
      const response = await ApplyCentralization({ session: sessionID, uuid: cloudFolderName });
      if (!response) {
        setApplicationStatus({
          status: 'error',
          message: 'Failed to apply centralization',
        });
      } else {
        setApplicationStatus({
          status: 'success',
          message: 'Centralization applied',
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
        message: 'Failed to apply centralization',
      });
      setGlobalLoading(false);
    }
  }

  const closeModal = () => {
    setCentralization({
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
          <h1>Centralization</h1>
        </ModalHeader>
      }
      open={centralization.modalOpen}
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
        <h2>{tooltipsTexts.centralization.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
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

export default CentralizationModal;