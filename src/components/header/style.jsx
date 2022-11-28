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
            border-radius: 10px;
            cursor: pointer;
            list-style: none;
            margin: auto 1.8rem;
            padding: 5px;
            user-select: none;
            width: 6%;

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