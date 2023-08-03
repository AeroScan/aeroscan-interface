import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from "@ant-design/icons";
import { Modal, Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "../../context";
import { ApplyCropBox } from "../../services/api";
import { Container } from '../modal/style';
import tooltipsTexts from "../../utils/tooltips";

const CropBoxModal = () => {
  const cropBoxSchema = yup.object().shape({
    startinPoint_x: yup.number().typeError("These three parameter are required"),
    startinPoint_y: yup.number().typeError("These three parameter are required"),
    startinPoint_z: yup.number().typeError("These three parameter are required"),
    endingPoint_x: yup.number().typeError("These three parameter are required"),
    endingPoint_y: yup.number().typeError("These three parameter are required"),
    endingPoint_z: yup.number().typeError("These three parameter are required"),
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(cropBoxSchema) });
  const { setApplicationStatus, setEfficientRansacApplied } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { cropBox, setCropBox } = useContext(GlobalContext);
  const { cloudFolderName, sessionID } = useContext(GlobalContext);

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
            min_x: data.startinPoint_x,
            min_y: data.startinPoint_y,
            min_z: data.startinPoint_z,
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
            console.log(cloudFolderName);
            console.log(response);
            setApplicationStatus({
              status: 'success',
              message: "Crop box applied",
            });
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
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={cropBox.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Crop Box Filter</h1>
        <h2>{tooltipsTexts.crop_box.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className="formContainer">
            <label htmlFor="startinPoint">Starting Point:</label>
            <input
              type="text"
              id="startinPoint"
              placeholder="x"
              {...register("startinPoint_x")}
            />
            <input
              type="text"
              id="startinPoint"
              placeholder="y"
              {...register("startinPoint_y")}
            />
            <input
              type="text"
              id="startinPoint"
              placeholder="z"
              {...register("startinPoint_z")}
            />
            <Tooltip
              placement="left"
              title={tooltipsTexts.crop_box.parameters.starting_point.text}
              overlayStyle={{ fontSize: "3rem" }}
            >
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          {errors.startinPoint_x ? (
            <span className='error'>{errors.startinPoint_x.message}</span>
          ) : errors.startingPoint_y ? (
            <span className='error'>{errors.startinPoint_y.message}</span>
          ) : errors.startinPoint_z ? (
            <span className='error'>{errors.startinPoint_z.message}</span>
          ) : null}
          <div className="formContainer">
            <label htmlFor="endingPoint">Ending Point:</label>
            <input
              type="text"
              id="endingPoint"
              placeholder="x"
              {...register("endingPoint_x")}
            />
            <input
              type="text"
              id="endingPoint"
              placeholder="y"
              {...register("endingPoint_y")}
            />
            <input
              type="text"
              id="endingPoint"
              placeholder="z"
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
      </Container>
    </Modal>
  );
};

export default CropBoxModal;