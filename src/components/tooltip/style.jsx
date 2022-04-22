import styled, { css, keyframes } from "styled-components";

export const TooltipWrapper = styled.div`
    display: inline-flex;
    position: relative;  
`;

export const TooltipTarget = styled.button`
    background: inherit;
    border: none;
    font-size: inherit;
    margin: -1px;
    padding: 5px;

    img{
        height: 15px;
        margin-left: 10px;
        width: 15px;

        &:hover{
            cursor: pointer;
        }
    }
`;

export const CenterContainer = styled.div`
    align-items: center;
    bottom: calc(100% + 5px);
    display: flex;
    justify-content: center;
    left: 50%;
    margin-left: -100px;
    pointer-events: none;
    position: absolute;
    width: 200px;
    
    ${({ position }) => {
        switch (position) {
            case "bottom":
                return css`
                    bottom: unset !important;
                    top: calc(100% + 5px);
                `;
            case "left":
                return css`
                    left: unset;
                    margin-right: 0;
                    right: calc(100% + 5px);
                    top: 50%;
                    width: 100%;
                `;
            case "right":
                return css`
                    left: calc(100% + 5px);
                    margin-left: 0;
                    top: 50%;
                    width: fit-content;
                    min-width: 180px;
                `;
            default:
                return css`
                    bottom: calc(100% + 5px);
                `;
        }
    }}
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const TooltipBox = styled.p`
    animation: ${fadeIn} 400ms linear;
    background-color: #${(props) => props.background};  
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #FFFFFF;
    text-align: left;
    border-radius: 5px;
    font-size: 1.25rem;
    padding: 10px 8px;
    position: relative;
  
    &:after{
        border-color: #${(props) => props.background} transparent transparent transparent;
        border-style: solid;
        border-width: 5px;
        content: "";
        height: 1px;
        left: calc(50% - 4.5px);
        position: absolute;
        top: 100%;
        width: 1px;
    }

    ${({ position }) => {
        switch (position) {
            case "bottom":
                return css`
                    &:after{
                        border-color: transparent transparent #${(props) => props.background} transparent;
                        bottom: 100%;
                        left: calc(50% - 5px);
                        top: unset;
                        width: 1px;
                    }
                `;
            case "left":
                return css`
                    &:after{
                        border-color: transparent transparent transparent #${(props) => props.background};
                        left: 100%;
                        top: calc(50% - 5px);
                    }
                `;
            case "right":
                return css`
                    &:after{
                        border-color: transparent #${(props) => props.background} transparent transparent;
                        left: unset;
                        right: 100%;
                        top: calc(50% - 5px);
                    }
                `;
            default:
                return css``;
        }
    }}
`;