import styled from 'styled-components';

export const Container = styled.footer`
    align-items: center;
    background: #FFF;
    bottom:0 ;
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
        padding-left: 30px;
        width: 60%;

        p{  
            border-left: 2px solid #D2CFCD;
            font-weight: 600;
            padding: 0 20px;

            &:first-child{
                border: none;
            }
        }
    }

    span{
        width: 12%;

        strong{
            font-weight: 600;
        }
    }

`