import styled from 'styled-components';

export const Container = styled.nav`
    background: #FFF;
    display: flex;
    flex-wrap: wrap;
   
    width: 100%;

    button{
        background: #D2CFCD;
        border: 1px solid #000; 
        cursor: pointer;
        font-size: 1.25rem;
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
        
        justify-content: center;
        text-align: center;
        width: 100%;  

        li{
            border-radius: 10px;
            cursor: pointer;
            list-style: none;
            margin: 10px 18px;
            padding: 5px 0;
            user-select: none;
            width: 6%;

            &:hover{
                background: #EFEEED;
            }

            &:active{
                background: #675C53CC;
            }

            img{
                height: 3rem;
                margin: 1rem 0;
                width: 3rem;
            }

            p{
                font-size: 1.25rem;
            }

        }
    }   
`