import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #000;
    display: flex;
    flex-direction: column;
    height: 72vh;
    position: relative;
    z-index: 0;

    *{
        font-size: 1.6rem;
    }  
`
export const Axes = styled.div`
    bottom: 10px;
    position: absolute;
    right: 0;
    width: 10%;
    z-index: 5;
`

// height: 675px;