import styled from 'styled-components';
import select from '../../assets/img/select.svg';

export const Container = styled.div`
    margin: 20px auto;
    text-align: center;
    width: 100%;

    .closeIcon{
        color: #000;
        font-size: 3.2rem;
        margin-right: 30px;
        padding: 1px;
        position: absolute;
        right: 0;

        &:hover{
            background: #D0D3D4;
            border-radius: 5px;
        }
    }
    
    h1{
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 40px;
        padding-bottom: 20px;
        text-transform: uppercase;
        width: 100%;
    }

    h2{
        width: 100%;
        font-size: 1.25rem;
        text-align: justify;
    }

    p, span{
        font-size: 1.25rem;
    }

    li{
        background: #000;
    }

    form{
        width: 100%;

        div.formContainer{
            width: 75%;
            display: flex;
            margin-top: 30px;
            align-items: center;
            text-align: center;

            p{
                font-size: 1.6rem;
                text-align: center;
                width: 100%;
            }
    
            label{
                font-size: 1.25rem;
                text-align: right;
                width: 75%;
            }
            
            input{
                border: none;
                border-radius: 5px;
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.45);
                font-size: 1.6rem;
                height: 3.5vh;
                margin-left: 10px; 
                padding: 5px;
                width: 50%;
            }
    
            select{
                appearance: none;
                background: url(${select}) no-repeat 95% center #FFF;
                background-size: 12px;
                border: none;
                border-radius: 5px;
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.45);
                cursor: pointer;
                font-size: 1.8rem;
                margin-left: 10px; 
                padding: 5px;
                width: 50%;
                    
                -moz-appearance: none;
                -webkit-appearance: none;
    
                option{
                    font-size: 1.8rem;
                }
            }
    
            img{
                height: 15px;
                margin-left: 10px;
                width: 15px;
    
                &:hover{
                    cursor: pointer;
                }
            }
    
            span{
                color: #000;
                font-size: 2.6rem;
                margin-left: 10px;
            } 
        } 
    
        span.error{
            color: #C0392B;
            font-size: 1.4rem;
        }
    }

    div.buttons-container{
        width: 40%;
        display: flex;
        margin: 30px auto 0px auto;
        justify-content: space-around;

        button{
            background: #626567;
            border: none;
            border-radius: 2rem;
            box-sizing: border-box;
            color: #FFF;
            font-weight: 600;
            padding: 0px 20px;
            
            &:hover{
                background: #7B7D7D
            }

            svg{
                font-size: 1.4rem;
            }
        }

        .cancel{
            background: #FF0000;

            &:hover{
                background: #C0392B;
            }
        }
    }
`