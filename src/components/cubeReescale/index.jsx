import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyCubeReescale } from '../../services/api';

const CubeReescale = ({ setCloudFolderName }) => {
  const cubeReescaleSchema = yup.object().shape({
    factor: yup.number().typeError('A number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(cubeReescaleSchema) });
  const { setApplicationStatus, setLoadings } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async (data) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    cubeReescaleSchema.validate(data)
      .then(async () => {
        try {
          const response = await ApplyCubeReescale({
            session: sessionID,
            uuid: cloudFolderName,
            factor: data.factor
          });
          if (!response) {
            setApplicationStatus('Failed to apply cube reescale');
          } else {
            setApplicationStatus('Cube reescale applied');
          }
          setCloudFolderName(response);
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = false;
            return newLoadings;
          });
        } catch (error) {
          console.error(error);
          setApplicationStatus('Failed to apply cube reescale');
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
        <label htmlFor='factor'>Factor:</label>
        <input
          type='text'
          id='factor'
          placeholder='float'
          {...register("factor")}
        />
        <Tooltip placement="right" title={'The select set the factor for rescaling the cloud. .'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.factor?.message}</span>
    </form>
  );
}

export default CubeReescale;