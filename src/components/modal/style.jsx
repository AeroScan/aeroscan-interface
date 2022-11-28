import styled from 'styled-components';
import select from '../../assets/img/select.svg';

export const customStyles = {

    overlay: {
        background: 'rgba(0,0,0,0.6)'
    },

    content: {
        background: '#FFF',
        height: 'fit-content',
        left: '50%',
        padding: '10px',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        width: '40%',
        zIndex: '1'
    }
}

export const Container = styled.div`
    margin: 20px auto;
    text-align: center;
    width: 100%;

    .closeIcon{
        color: #000;
        font-size: 4.5rem;
        margin-right: 20px;
        position: absolute;
        right: 0;
    }
    
    h1{
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 40px;
        padding-bottom: 20px;
        text-transform: uppercase;
        width: 100%;
    }

    li{
        background: #000;
    }

    form{

        width: 100%;
        
        div.container{
            align-items: center;
            display: flex;
            margin: 30px 100px 5px;
            text-align: center;
            width: 60%;

            label{
                font-size: 1.8rem;
                text-align: right;
                width: 30%;
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
            color: red;
            font-size: 1.4rem;
        }
    }

    div.buttons-container{
        display: flex;
        justify-content: space-around;
        margin: 20px auto 0;
        width: 40%;

        button{
            background: #626567;
            border: none;
            border-radius: 2rem;
            box-sizing: border-box;
            color: #FFF;
            font-size: 2rem;
            font-weight: 600;
            height: 40px;
            width: 40%;
        
            &:hover{
                background: ${props => props.cancel ? '#C0392B' : '#7B7D7D'};
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