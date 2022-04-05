import React, { useState } from 'react';
import { Container, Link } from './style';
import logo from '../../assets/img/logo.png';
import Loading from '../../components/loading/index';
import md5 from 'md5';
import { SaveToken } from '../../services/util';

const Login = () => {

    const[userName, setUserName] = useState("");
    const[password, setPassword] = useState("");

    const[error,setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if(userName.includes("@")){
                const userNameHash = md5(userName.split('@')[0]);
                const correctPassword = `${userNameHash.slice(0, 5)}${userNameHash.slice(userNameHash.length - 5, userNameHash.length)}`;
                if(password === correctPassword){
                    SaveToken(userName);
                    window.open("/","_self");
                    setLoading(false);
                }else {  
                    setError(true);
                    setLoading(false);
                }
            }else{
                setError(true);
                setLoading(false);
            }
        }, 1000);
    }

    return(
        <Container>
            <img src={logo} alt="logo" />
            <form onSubmit={handleSubmit}>
                <h1>Forneça suas Credenciais</h1>
                <input 
                    type="text" 
                    placeholder='nome de usuário' 
                    aria-label='nome'
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder='senha' 
                    aria-label='senha'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} 
                />
                <button type='submit'>
                    {loading ? <Loading height={'25px'} width={'25px'} /> : 'Acessar'}
                </button>
                <span>{error && 'Credenciais Inválidas'}</span>
                {/* <Link to='/'>Esqueceu sua senha?</Link> */}
            </form>
        </Container>
    );
}

export default Login