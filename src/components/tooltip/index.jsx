import React, { useRef, useState } from 'react';
import questionIcon from '../../assets/img/question-mark-on-a-circular-black-background.png';
import { TooltipWrapper, TooltipTarget, CenterContainer, TooltipBox } from './style';

const Tooltip = ({ position, text, background }) => {
    const [isHovered, setIsHovered] = useState(false);
    const targetRef = useRef(null);

    return (  
        <TooltipWrapper>
            <TooltipTarget
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                ref={targetRef}
            >
                <img src={questionIcon} alt="" />
            </TooltipTarget>
            {isHovered && (
                <CenterContainer position={position}>
                    <TooltipBox background={background} position={position}>
                        {text}
                    </TooltipBox>
                </CenterContainer>
            )}
        </TooltipWrapper>
    );
}
 
export default Tooltip;