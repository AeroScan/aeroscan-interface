import styled from 'styled-components';

export const Container = styled.footer`
    align-items: center;
    background: #FFF;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    height: 8vh;
    justify-content: space-between;
    padding: 0 2rem;
    position: absolute;
    width: 100%;

    *{
        font-size: 14px;
    }

    div{
        align-items: center;
        display: flex;
        height: 40px;
        width: 25%;

        p{  
            border-left: 2px solid #D2CFCD;
            font-size: 1.4rem;
            font-weight: 600;
            padding: 0 2rem;

            &:first-child{
                border: none;
            }
        }
    }

    span{
        font-size: 1.4rem;
        text-align: right;
        width: 20%;

        strong{
            font-size: 1.4rem;
            font-weight: 600;
        }
    }

`