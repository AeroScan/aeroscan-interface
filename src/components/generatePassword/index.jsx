import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import md5 from 'md5';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { Container } from '../modal/style';

const GeneratePasswordModal = () => {

  const gerenatePasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('The field is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(gerenatePasswordSchema) });
  const { generatePassword, setGeneratePassword } = useContext(GlobalContext);

  const onSubmit = data => {
    gerenatePasswordSchema.validate(data)
      .then(async () => {
        const emailHash = md5(data.email.split('@')[0]);
        const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
        document.getElementById("password").value = password;
      })
      .catch(err => {
        console.log(err);
      });
  }

  const closeModal = () => {
    setGeneratePassword({
      modalOpen: false,
    });
  };

  return (
    <Modal
      open={generatePassword.modalOpen}
      footer={null}
      width={"40%"}
      closable={false}
      maskClosable={true}
      centered
      destroyOnClose
    >
      <Container>
        <CloseOutlined className="closeIcon" onClick={closeModal} />
        <h1>Generate Password</h1>
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
            <Tooltip placement="right" title={'This field show the password generated by md5.'} overlayStyle={{ fontSize: '3rem' }}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
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

export default GeneratePasswordModal;