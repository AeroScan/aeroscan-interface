import styled from "styled-components";

export const OverlayContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 25;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: rgba(0, 0, 0, 0.75);

    span {
        color: #FFFFFF;
        font-size: 18px;
        font-weight: bold;
    }
`;