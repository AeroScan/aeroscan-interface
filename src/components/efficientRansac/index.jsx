import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyEfficientRansac } from '../../services/api';

const EfficientRansac = ({ setCloudFolderName }) => {

  const { setApplicationStatus } = useContext(GlobalContext);
  const efficientRansacSchema = yup.object().shape({
    probability: yup.number().typeError('A number is required'),
    minPoints: yup.number().typeError('A number is required'),
    clusterEpsilon: yup.number().typeError('A number is required'),
    epsilon: yup.number().typeError('A number is required'),
    normalThreshold: yup.number().typeError('A number is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(efficientRansacSchema) });
  const { setLoadings } = useContext(GlobalContext);
  const { setEfficientRansacApplied } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(() => {
      efficientRansacSchema.validate(data)
        .then(async () => {
          try {
            const response = await ApplyEfficientRansac({
              probability: data.probability,
              min_points: data.minPoints,
              epsilon: data.clusterEpsilon,
              cluster_epsilon: data.epsilon,
              normal_threshold: data.normalThreshold,
            });
            if (!response) {
              setApplicationStatus('Failed to apply efficient ransac');
            }
            setApplicationStatus('Efficient ransac applied');
            setEfficientRansacApplied(true);
            setCloudFolderName(response);
          } catch (error) {
            console.error(error);
            setApplicationStatus('Failed to apply efficient ransac');
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
      <div className='formContainer'>
        <label htmlFor='probability'>Probability:</label>
        <input
          type='text'
          id='probability'
          placeholder='float'
          {...register('probability')}
        />
        <Tooltip placement="right" title={'This field set the method stop condition, probability of losing the largest primitive at each iteration.'} overlayStyle={{ fontSize: '3rem' }}>
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
        <Tooltip placement="right" title={'This field set the minimum number of points for a sample to be considered a possible individual primitive.'} overlayStyle={{ fontSize: '3rem' }}>
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
        <Tooltip placement="right" title={'This field set the distance used for two neighboring points to be considered adjacent or not.'} overlayStyle={{ fontSize: '3rem' }}>
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
        <Tooltip placement="right" title={'This field set the minimum distance between a primitive and a point for it to be considered belonging to it.'} overlayStyle={{ fontSize: '3rem' }}>
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
        <Tooltip placement="right" title={'This field limits how much the normal of a point can angularly differ from the normal of the primitive at the projection position of that point.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.normalThreshold?.message}</span>
    </form>
  );
}

export default EfficientRansac;