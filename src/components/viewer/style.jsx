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

export const AxisWrapper = styled.div`
    right: 15px;
    bottom: 30px;
    width: 100px;
    position: absolute;
    z-index: 100;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export const AxisImg = styled.img`
    width: 100%;
`;

// height: 675px;