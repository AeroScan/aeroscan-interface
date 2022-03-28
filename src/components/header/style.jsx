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
            list-style: none;
            cursor: pointer;
            margin: auto 18px;
            width: 6%;

        }
    }
    
`

// &:hover{
//     background: #EFEEED;
// }

// &:active{
//     background: #675C53CC;
// }

// F5F5F5