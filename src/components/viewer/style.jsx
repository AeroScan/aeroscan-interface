import styled from "styled-components";

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
    bottom: 25px;
    position: absolute;
    right: 0;
    width: 10%;
    z-index: 10;
`

export const ViewSwitchContainer = styled.div`
    right: 0;
    top: 25px;
    width: 10%;
    z-index: 10;
    position: absolute;

    h1 {
        color: white;
        font-weight: 600;
        margin-bottom: 0px;
    }
`
