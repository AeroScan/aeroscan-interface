import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const OverlayContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75);
`;