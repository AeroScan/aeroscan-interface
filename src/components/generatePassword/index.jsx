import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import md5 from 'md5';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';

const GeneratePassword = () => {
  const gerenatePasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('The field is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(gerenatePasswordSchema) });
  const { setLoadings } = useContext(GlobalContext);

  const onSubmit = data => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(async () => {
      gerenatePasswordSchema.validate(data)
        .then(async () => {
          const emailHash = md5(data.email.split('@')[0]);
          const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
          document.getElementById("password").value = password;
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
        <label htmlFor='email'>E-mail:</label>
        <input
          type='text'
          id='email'
          placeholder='email'
          {...register("email")}
        />
        <Tooltip placement="right" title={'This field generate a password through the e-mail.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
      <span className='error'>{errors.email?.message}</span>
      <div className='formContainer'>
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          id='password'
          placeholder='password'
          {...register("password", { disabled: true })}
        />
        <Tooltip placement="right" title={'This field show the password generated.'} overlayStyle={{ fontSize: '3rem' }}>
          <QuestionCircleFilled />
        </Tooltip>
      </div>
    </form>
  );
}

export default GeneratePassword;