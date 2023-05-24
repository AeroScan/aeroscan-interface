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

const CropBoxModal = ({ setCloudFolderName }) => {
  const cropBoxSchema = yup.object().shape({
    startinPoint_x: yup.number().typeError("These three parameter are required"),
    startinPoint_y: yup.number().typeError("These three parameter are required"),
    startinPoint_z: yup.number().typeError("These three parameter are required"),
    endingPoint_x: yup.number().typeError("These three parameter are required"),
    endingPoint_y: yup.number().typeError("These three parameter are required"),
    endingPoint_z: yup.number().typeError("These three parameter are required"),
  });
  const { handleSubmit, register, formState: { errors }} = useForm({ resolver: yupResolver(cropBoxSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { loadings, setLoadings } = useContext(GlobalContext);
  const { cropBox, setCropBox } = useContext(GlobalContext);
  const { cloudFolderName, sessionID } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(() => {
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
              setApplicationStatus("Failed to apply crop box");
            }
            setApplicationStatus("Crop box applied");
            setCloudFolderName(response);
          } catch (error) {
            console.error(error);
            setApplicationStatus("Failed to apply crop box");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;

        return newLoadings;
      });
    }, 2000);
  };

  const handleCloseModal = () => {
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
        <CloseOutlined className="closeIcon" onClick={handleCloseModal} />
        <h1>Crop Box Filter</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className="formContainer">
            <label htmlFor="startinPoint">Starting Point:</label>
            <input
              type="text"
              id="startinPoint"
              placeholder="x"
              {...register("startinPoint_x", { value: `${cropBox.startinPoint_x}` })}
            />
            <input
              type="text"
              id="startinPoint"
              placeholder="y"
              {...register("startinPoint_y", { value: `${cropBox.startinPoint_y}` })}
            />
            <input
              type="text"
              id="startinPoint"
              placeholder="z"
              {...register("startinPoint_z", { value: `${cropBox.startinPoint_z}` })}
            />
            <Tooltip
              placement="right"
              title={"These fields set the minimum coordinates."}
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
              {...register("endingPoint_x", { value: `${cropBox.endingPoint_x}` })}
            />
            <input
              type="text"
              id="endingPoint"
              placeholder="y"
              {...register("endingPoint_y", { value: `${cropBox.endingPoint_y}` })}
            />
            <input
              type="text"
              id="endingPoint"
              placeholder="z"
              {...register("endingPoint_z", { value: `${cropBox.endingPoint_z}` })}
            />
            <Tooltip
              placement="right"
              title={"These fields set the maximum coordinates."}
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
};

export default CropBoxModal;