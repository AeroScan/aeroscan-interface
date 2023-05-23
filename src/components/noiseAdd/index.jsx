import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyNoiseAdd } from '../../services/api';

const NoiseAdd = ({ setCloudFolderName }) => {
  const noiseAddSchema = yup.object().shape({
    limit: yup.number().typeError('A number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(noiseAddSchema) });
  const { setApplicationStatus, setLoadings } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    noiseAddSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyNoiseAdd({
            session: sessionID,
            uuid: cloudFolderName,
            limit: data.limit,
          });
          if (!response) {
            setApplicationStatus('Failed to apply noise add');
          } else {
            setApplicationStatus('Noise add applied');
          }
          setCloudFolderName(response);
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = false;
            return newLoadings;
          });
        } catch (error) {
          console.error(error);
          setApplicationStatus('Failed to apply noise add');
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
        <label htmlFor='limit'>Limit:</label>
        <input
          type='text'
          id='limit'
          placeholder='float'
          {...register("limit")}
        />
        <Tooltip placement="right" title={'The select set the maximum value of noise to add.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.limit?.message}</span>
    </form>
  );
}

export default NoiseAdd;