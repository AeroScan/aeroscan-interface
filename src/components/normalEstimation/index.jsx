import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyNormalEstimation } from '../../services/api';

const NormalEstimation = ({ setCloudFolderName }) => {
  const normalEstimationSchema = yup.object().shape({
    radius: yup.number().typeError('A number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(normalEstimationSchema) });
  const { setApplicationStatus, setLoadings } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    normalEstimationSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyNormalEstimation({
            session: sessionID,
            uuid: cloudFolderName,
            radius: data.radius,
          });
          if (!response) {
            setApplicationStatus('Failed to apply normal estimation');
          } else {
            setApplicationStatus('Normal estimation applied');
          }
          setCloudFolderName(response);
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = false;
            return newLoadings;
          });
        } catch (error) {
          console.error(error);
          setApplicationStatus('Failed to apply normal estimation');
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
        <label htmlFor='radius'>Radius:</label>
        <input
          type='text'
          id='radius'
          placeholder='float'
          {...register("radius")}
        />
        <Tooltip placement="right" title={'This field set the radius.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.radius?.message}</span>
    </form>
  );
}

export default NormalEstimation;