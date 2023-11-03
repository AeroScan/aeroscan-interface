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
import { ApplyCropBox } from "../../services/api";
import { ModalHeader, AntModal } from "../modal/style";

const CropBoxModal = () => {
  const cropBoxSchema = yup.object().shape({
    startingPoint_x: yup.number().typeError("These three parameters are required"),
    startingPoint_y: yup.number().typeError("These three parameters are required"),
    startingPoint_z: yup.number().typeError("These three parameters are required"),
    endingPoint_x: yup.number().typeError("These three parameters are required"),
    endingPoint_y: yup.number().typeError("These three parameters are required"),
    endingPoint_z: yup.number().typeError("These three parameters are required"),
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(cropBoxSchema) });
  const { setApplicationStatus, setEfficientRansacApplied } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { cropBox, setCropBox } = useContext(GlobalContext);
  const { cloudFolderName, sessionID } = useContext(GlobalContext);
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
      message: 'Applying crop box'
    });
    setGlobalLoading(true)
    cropBoxSchema
      .validate(data)
      .then(async () => {
        try {
          const response = await ApplyCropBox({
            session: sessionID,
            uuid: cloudFolderName,
            min_x: data.startingPoint_x,
            min_y: data.startingPoint_y,
            min_z: data.startingPoint_z,
            max_x: data.endingPoint_x,
            max_y: data.endingPoint_y,
            max_z: data.endingPoint_z,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: "Failed to apply crop box",
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: "Crop box applied",
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
            message: "Failed to apply crop box",
          });
          setGlobalLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setCropBox({
      ...cropBox,
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
          <h1>Crop Box Filter</h1>
        </ModalHeader>
      }
      open={cropBox.modalOpen}
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
        <h2>{tooltipsTexts.crop_box.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className="formContainer">
            <label htmlFor="startingPoint">Starting Point:</label>
            <input
              type="text"
              id="startingPoint"
              placeholder={cropBox.startingPoint_x}
              {...register("startingPoint_x")}
            />
            <input
              type="text"
              id="startingPoint"
              placeholder={cropBox.startingPoint_y}
              {...register("startingPoint_y")}
            />
            <input
              type="text"
              id="startingPoint"
              placeholder={cropBox.startingPoint_z}
              {...register("startingPoint_z")}
            />
            <Tooltip
              placement="left"
              title={tooltipsTexts.crop_box.parameters.starting_point.text}
              overlayStyle={{ fontSize: "3rem" }}
            >
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          {errors.startingPoint_x ? (
            <span className='error'>{errors.startingPoint_x.message}</span>
          ) : errors.startingPoint_y ? (
            <span className='error'>{errors.startingPoint_y.message}</span>
          ) : errors.startingPoint_z ? (
            <span className='error'>{errors.startingPoint_z.message}</span>
          ) : null}
          <div className="formContainer">
            <label htmlFor="endingPoint">Ending Point:</label>
            <input
              type="text"
              id="endingPoint"
              placeholder={cropBox.endingPoint_x}
              {...register("endingPoint_x")}
            />
            <input
              type="text"
              id="endingPoint"
              placeholder={cropBox.endingPoint_y}
              {...register("endingPoint_y")}
            />
            <input
              type="text"
              id="endingPoint"
              placeholder={cropBox.endingPoint_z}
              {...register("endingPoint_z")}
            />
            <Tooltip
              placement="left"
              title={tooltipsTexts.crop_box.parameters.ending_point.text}
              overlayStyle={{ fontSize: "3rem" }}
            >
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          {errors.endingPoint_x ? (
            <span className='error'>{errors.endingPoint_x.message}</span>
          ) : errors.endingPoint_y ? (
            <span className='error'>{errors.endingPoint_y.message}</span>
          ) : errors.endingPoint_z ? (
            <span className='error'>{errors.endingPoint_z.message}</span>
          ) : null}
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
};

export default CropBoxModal;