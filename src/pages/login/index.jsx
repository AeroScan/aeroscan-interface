import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import md5 from 'md5';
import { Container, Link } from './style';
import { SaveToken } from '../../services/util';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const Login = () => {

    const[userName, setUserName] = useState("");
    const[password, setPassword] = useState("");

    const[error,setError] = useState(false);
    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                
                return newLoadings;
            });
        }, 2000);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setTimeout(() => {
            if(userName.includes("@")){
                const userNameHash = md5(userName.split('@')[0]);
                const correctPassword = `${userNameHash.slice(0, 5)}${userNameHash.slice(userNameHash.length - 5, userNameHash.length)}`;
                if(password === correctPassword){
                    SaveToken(userName);
                    window.open("/","_self");
                }else {  
                    setError(true);
                }
            }else{
                setError(true);
            }
            
        }, 2100);
    }

    return(
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={handleSubmit}>
                <h1>Forneça suas Credenciais</h1>
                <input 
                    type="text" 
                    placeholder='email' 
                    aria-label='email'
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    aria-label='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <Button className='ant' htmlType='submit' value='submit' loading={loadings[0]} onClick={() => enterLoading(0)}>
                    Acessar
                </Button>
                <span className='error'>{error && 'Invalid Credentials'}</span>
                {/* <Link to='/'>Esqueceu sua senha?</Link> */}
            </form>
        </Container>
    );
}

export default Login;