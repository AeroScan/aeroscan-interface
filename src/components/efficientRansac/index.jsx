import React, { useState, useRef, useContext } from 'react';
import Draggable from 'react-draggable'; 
import tooltipsTexts from "../../utils/tooltips";
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip, Checkbox, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyEfficientRansac } from '../../services/api';
import { ModalHeader, AntModal } from '../modal/style';

const EfficientRansacModal = () => {

  const efficientRansacSchema = yup.object().shape({
    probability: yup.number().typeError('A number is required'),
    minPoints: yup.number().typeError('A number is required'),
    clusterEpsilon: yup.number().typeError('A number is required'),
    epsilon: yup.number().typeError('A number is required'),
    normalThreshold: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(efficientRansacSchema) });
  const { setApplicationStatus } = useContext(GlobalContext);
  const { setGlobalLoading, setCloudFolderName } = useContext(GlobalContext);
  const { efficientRansac, setEfficientRansac } = useContext(GlobalContext);
  const { setEfficientRansacApplied } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);
  const { voxelGrid, setVoxelGrid } = useContext(GlobalContext);
  const { normalEstimation, setNormalEstimation } = useContext(GlobalContext);

  const [primitives, setPrimitives] = useState(["sphere", "cone", "cylinder", "plane"]);
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
      message: 'Applying efficient ransac',
    });
    setGlobalLoading(true);
    efficientRansacSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyEfficientRansac({
            session: sessionID,
            uuid: cloudFolderName,
            probability: data.probability,
            min_points: data.minPoints,
            epsilon: data.clusterEpsilon,
            cluster_epsilon: data.epsilon,
            normal_threshold: data.normalThreshold,
            primitives: primitives,
          });
          if (!response) {
            setApplicationStatus({
              status: 'error',
              message: 'Failed to apply efficient ransac',
            });
          } else {
            setApplicationStatus({
              status: 'success',
              message: 'Efficient ransac applied',
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
            setEfficientRansacApplied(true);
            setCloudFolderName(response);
          }
          setGlobalLoading(false);
        } catch (error) {
          console.error(error);
          setApplicationStatus({
            status: 'error',
            message: 'Failed to apply efficient ransac',
          });
          setGlobalLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setEfficientRansac({
      ...efficientRansac,
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
          <h1>Efficient Ransac</h1>
        </ModalHeader>
      }
      open={efficientRansac.modalOpen}
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
        <h2>{tooltipsTexts.efficient_ransac.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='probability'>Probability:</label>
            <input
              type='text'
              id='probability'
              placeholder={efficientRansac.probability}
              {...register('probability')}
            />
            <Tooltip placement="left" title={tooltipsTexts.efficient_ransac.parameters.probability.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.probability?.message}</span>
          <div className='formContainer'>
            <label htmlFor='minPoints'>Min Points:</label>
            <input
              type='text'
              id='minPoints'
              placeholder={efficientRansac.minPoints}
              {...register('minPoints')}
            />
            <Tooltip placement="left" title={tooltipsTexts.efficient_ransac.parameters.min_points.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.minPoints?.message}</span>
          <div className='formContainer'>
            <label htmlFor='clusterEpsilon'>Cluster Epsilon:</label>
            <input
              type='text'
              id='minPoints'
              placeholder={efficientRansac.clusterEpsilon}
              {...register('clusterEpsilon')}
            />
            <Tooltip placement="left" title={tooltipsTexts.efficient_ransac.parameters.cluster_epsilon.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.clusterEpsilon?.message}</span>
          <div className='formContainer'>
            <label htmlFor='epsilon'>Epsilon:</label>
            <input
              type='text'
              id='epsilon'
              placeholder={efficientRansac.epsilon}
              {...register('epsilon')}
            />
            <Tooltip placement="left" title={tooltipsTexts.efficient_ransac.parameters.epsilon.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.epsilon?.message}</span>
          <div className='formContainer'>
            <label htmlFor='normalThreshold'>Normal Threshold:</label>
            <input
              type='text'
              id='normalThreshold'
              placeholder={efficientRansac.normalThreshold}
              {...register('normalThreshold')}
            />
            <Tooltip placement="left" title={tooltipsTexts.efficient_ransac.parameters.normal_threshold.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.normalThreshold?.message}</span>
          <Checkbox.Group
            defaultValue={"plane, cylinder, cone, sphere"}
            style={{
              width: '75%',
            }}
            onChange={(values) => setPrimitives(values)}
          >
            <Row defaultChecked={true}>
              <Col span={4}>
                <Checkbox value="plane">Plane</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="cylinder">Cylinder</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="cone">Cone</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="sphere">Sphere</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
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

export default EfficientRansacModal;