import styled from 'styled-components';

export const Container = styled.nav`
    background: #FFF;
    display: flex;
    flex-wrap: wrap;
    height: 20vh;
    width: 100%;

    button{
        background: #D2CFCD;
        border: 1px solid #000; 
        cursor: pointer;
        font-size: 1.6rem;
        height: 6vh;
        text-align: center;
        width: ${props => 100 / props.tabLength}%;
    }

    button.active{
        background: #FFF;
        border: none;
    }

    ul{    
        display: flex;
        height: 14vh;
        justify-content: center;
        text-align: center;
        width: 100%;  

        li{
            cursor: pointer;
            list-style: none;
            margin: auto 1.8rem;
            width: 6%;
            padding: 20px 0;
            border-radius: 10px;
            user-select: none;

            &:hover{
                background: #EFEEED;
            }

            &:active{
                background: #675C53CC;
            }

            img{
                height: 4rem;
                margin: 0.5rem 0;
                width: 4rem;
            }

            p{
                font-size: 1.6rem;
            }

        }
    }   
`