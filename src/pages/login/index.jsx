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

    const { register, handleSubmit } = useForm();
    const [loadings, setLoadings] = useState([]);
    const [currentErrors, setCurrentErrors] = useState("");
    
    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('The field is required'),
        password: yup.string().required('The field is required')
    });
    
    const onSubmit = data => {

        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });

        setTimeout(() => {
            loginSchema.validate(data)
            .then( async() => {
                const emailHash = md5(data.email.split('@')[0]);
                const correctPassword = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                if(data.password === correctPassword){
                    SaveToken(data.email);
                    window.open("/","_self");
                }
            })
            .catch(err => {
                setCurrentErrors(err.errors);
            });

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
                    {...register("email")}
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    aria-label='password'
                    {...register("password")}
                />
                <Button 
                    className='antButton' 
                    htmlType='submit' 
                    value='submit' 
                    
                >
                    Access
                </Button>
                <span className='error'>{currentErrors}</span>
                {/* <Link to='/'>Esqueceu sua senha?</Link> */}
            </form>
        </Container>
    );
}

export default Login;