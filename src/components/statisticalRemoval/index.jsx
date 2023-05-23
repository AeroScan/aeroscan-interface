import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyStatisticalOutlierRemoval } from '../../services/api';

const StatisticalRemoval = ({ setCloudFolderName }) => {
  const statisticalRemovalSchema = yup.object().shape({
    mean: yup.number().typeError('A number is required'),
    standardDeviation: yup.number().typeError('A number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(statisticalRemovalSchema) });
  const { setApplicationStatus, setLoadings } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    statisticalRemovalSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyStatisticalOutlierRemoval({
            session: sessionID,
            uuid: cloudFolderName,
            mean: data.mean,
            std: data.standardDeviation,
          });
          if (!response) {
            setApplicationStatus('Failed to apply statistical removal');
          } else {
            setApplicationStatus('Statistical removal applied');
          }
          setCloudFolderName(response);
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = false;
            return newLoadings;
          });
        } catch (error) {
          console.error(error);
          setApplicationStatus('Failed to apply statistical removal');
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = false;
            return newLoadings;
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
      <div className='formContainer'>
        <label htmlFor='mean'>Mean:</label>
        <input
          type='text'
          id='mean'
          placeholder='float'
          {...register('mean')}
        />
        <Tooltip placement="right" title={'This field set the average.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.mean?.message}</span>
      <div className='formContainer'>
        <label htmlFor='standardDeviation'>Standard Deviation:</label>
        <input
          type='text'
          id='standardDeviation'
          placeholder='float'
          {...register('standardDeviation')}
        />
        <Tooltip placement="right" title={'This field set the standard deviation.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.standardDeviation?.message}</span>
    </form>
  );
}

export default StatisticalRemoval;