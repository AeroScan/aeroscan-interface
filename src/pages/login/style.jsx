import styled from 'styled-components';
import { StyledLink } from '../../components/UI/globalStyled';

export const Container = styled.div`
    align-items: center;
    background: linear-gradient(to right, #ecedec, #cdcdcc, #acadac);
    display: flex;
    height: 100vh;
    justify-content: space-around;
    padding: 0 200px;
    width: 100%;

    img{
        height: 50rem;
        padding: 0 10rem;
        width: 70rem;
    }

    form{
        align-items: center;
        background: #FFF;
        border-radius: 50px;
        box-shadow: -5px 10px 20px 5px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        height: 500px;
        justify-content: center;
        min-width: 300px;
        width: 30%;
        
        h1{
            color: #685d54;
            font-size: 2.4rem;
            font-weight: 900;
            margin-bottom: 20px;
            margin-top: 20px;
            text-align: center;
        }

        input{
            border: 1px solid #ababab;
            border-radius: 15px;
            color: #675c53;
            cursor: pointer;
            font-size: 1.8rem;
            height: 42px;        
            margin-top: 28px;
            text-align: center;
            width: 75%;

            &::placeholder{
                color: #9b9b9b;
            }

            &:focus{
                outline-color: #9b9b9b;
            }
        }

        button.ant{
            background-color: #008542;
            border: none;
            border-radius: 30px;
            color: #FFF;
            font-size: 2.4rem;
            font-weight: 600;
            height: 46px;
            margin: 48px 0 10px;
            width: 200px;  

            svg{
                font-size: 1.8rem;
            }
        }

        span.error{
            color: red;
            font-size: 1.4rem;
        }
    }

`

export const Link = styled(StyledLink)`
    color: #FDC82F;
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
    text-decoration: underline;
    
    &:visited{
        color: #FDC82F;
    }
`

// button{
//     background-color: #008542;
//     border: none;
//     border-radius: 30px;
//     color: #FFF;
//     cursor: pointer;
//     font-size: 2.4rem;
//     font-weight: 600;
//     height: 42px;
//     margin: 48px 0 10px;
//     width: 200px;
// }

// span{
//     margin-right: 5px;
//     height: 20px;
//     width: 20px;
// }