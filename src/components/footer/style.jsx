import styled from 'styled-components';

export const Container = styled.footer`
    align-items: center;
    background: #FFF;
    bottom: 0;
    display: flex;
    height: 8vh;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    *{
        font-size: 14px;
    }

    div{
        display: flex;
        padding-left: 3rem;
        width: 60%;

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
        padding-right: 5rem;
        text-align: right;
        width: 20%;

        strong{
            font-size: 1.4rem;
            font-weight: 600;
        }
    }

`