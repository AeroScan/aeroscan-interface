import styled from 'styled-components';
import CloseModal from '../../assets/img/closeModal.svg';

export const customStyles = {

    overlay: {
        background: 'rgba(0,0,0,0.6)'
    },

    content: {
        background: '#FFF',
        height: '300px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        padding: '0',
        width: '40%',
        zIndex: '1', 
    }
    
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    position: absolute;
    text-align: center;
    width: 100%;
    
    h1{
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        font-weight: 600;
        margin: 5px 0;
        padding: 15px 0;
        text-transform: uppercase;
    }

    p{
        margin: 20px 0;
    }
`

export const Close = styled.button`
    background-color: #FFF;
    background-image: url(${CloseModal});
    background-repeat: no-repeat;
    background-size: 20px;
    border: none;
    cursor: pointer;
    height: 25px;
    margin: 10px 20px 0 0;
    position: absolute;
    right: 0;
    width: 25px;
`