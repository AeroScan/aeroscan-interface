import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyEfficientRansac } from '../../services/api';
import { Container } from '../modal/style';
import tooltipsTexts from '../../utils/tooltips';

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
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={efficientRansac.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Efficient Ransac</h1>
        <h2>{tooltipsTexts.efficient_ransac.text}</h2>
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
          <div className='formContainer'>
            <label htmlFor='probability'>Probability:</label>
            <input
              type='text'
              id='probability'
              placeholder='float'
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
              placeholder='float'
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
              placeholder='float'
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
              placeholder='float'
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
              placeholder='float'
              {...register('normalThreshold')}
            />
            <Tooltip placement="left" title={tooltipsTexts.efficient_ransac.parameters.normal_threshold.text} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
          <span className='error'>{errors.normalThreshold?.message}</span>
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

export default EfficientRansacModal;