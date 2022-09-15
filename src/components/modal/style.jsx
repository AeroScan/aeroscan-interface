import styled from 'styled-components';
import CloseModal from '../../assets/img/closeModal.png';
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
    
    h1{
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 40px;
        padding-bottom: 20px;
        text-transform: uppercase;
        width: 100%;
    }

    form{

        width: 100%;

        div.container{
            align-items: center;
            display: flex;
            margin: 30px auto 5px auto;
            text-align: center;
            width: 75%;

            label{
                font-size: 1.35rem;
                text-align: right;
                width: 50%;
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
        }

        span{
            color: red;
            font-size: 1.4rem;
        }
    }

    div.buttons-container{
        display: flex;
        justify-content: space-around;
        margin: 50px auto 0;
        width: 40%;
    }
`

export const Button = styled.button`
    background: ${props => props.cancel ? '#FF0000' : '#626567'};
    border: none;
    border-radius: 2rem;
    box-sizing: border-box;
    color: #FFF;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 10px 15px;

    &:hover{
        background: ${props => props.cancel ? '#C0392B' : '#7B7D7D'};
    }
`

export const Close = styled.button`
    background-color: #FFF;
    background-image: url(${CloseModal});
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    cursor: pointer;
    height: 20px;
    margin-top: -10px;
    margin-right: 20px;
    position: absolute;
    right: 0;
    width: 20px;
`