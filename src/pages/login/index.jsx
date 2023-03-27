import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import md5 from 'md5';
import { Container, Link } from './style';
import { useForm } from "react-hook-form";
import { SaveToken } from '../../services/util';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';


const Login = () => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loadings, setLoadings] = useState([]);   
    
    const loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(10).max(10).required()
    });
    
    const onSubmit = data => {

        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });

        setTimeout(async () => {
            const isValid = await loginSchema.isValid(data)
            if(isValid){
                const emailHash = md5(data.email.split('@')[0]);
                const correctPassword = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                if(data.password === correctPassword){
                    SaveToken(data.email);
                    window.open("/","_self");
                }else{  

                }
            }

            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                
                return newLoadings;
            });
        }, 2000);
        
    };

    return(
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Provide your Credentials</h1>
                <input 
                    type="text" 
                    placeholder='e-mail' 
                    aria-label='email'
                    {...register("email", { required: 'Invalid e-mail' })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <span role="alert" className='error'>{errors.email?.message}</span>}
                <input 
                    type="password" 
                    placeholder='password' 
                    aria-label='password'
                    {...register("password", { required: 'Invalid password' })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <span className='error'>{errors.password?.message}</span>}
                <Button 
                    className='antButton' 
                    htmlType='submit' 
                    value='submit' 
                    loading={loadings[0]} 
                >
                    Access
                </Button>
                {/* <span className='error'>{errors.email.type.custom}</span> */}
                {/* <Link to='/'>Esqueceu sua senha?</Link> */}
            </form>
        </Container>
    );
}

export default Login;