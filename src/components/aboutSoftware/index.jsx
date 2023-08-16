import React, { useState, useRef, useContext } from 'react';
import Draggable from 'react-draggable'; 
import { GlobalContext } from '../../context';
import { CloseOutlined } from '@ant-design/icons';
import { ModalHeader, AntModal } from '../modal/style';
import { softwareVersion } from '../../services/contants';

const AboutSoftwareModal = () => {

    const { aboutSoftware, setAboutSoftware } = useContext(GlobalContext);
    const draggleRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    
    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
        return;
        }
        setBounds({
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const closeModal = () => {
        setAboutSoftware({
          modalOpen: false,
        });
    };

    return(
        <AntModal
            title={
                <ModalHeader
                onMouseOver={() => disabled && setDisabled(false)}
                onMouseOut={() => setDisabled(true)}
                >
                    <CloseOutlined className="closeIcon" onClick={closeModal} />
                    <h1>About Software</h1>
                </ModalHeader>
            }
            open={aboutSoftware.modalOpen}
            onCancel={closeModal}
            footer={null}
            width={"40%"}
            closable={false}
            maskClosable={true}
            centered
            destroyOnClose
            modalRender={(modal) => (
                <Draggable
                  disabled={disabled}
                  bounds={bounds}
                  nodeRef={draggleRef}
                  onStart={(event, uiData) => onStart(event, uiData)}
                >
                  <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
        >
            <div>
                
                <p>
                    This software was developed exclusively for use in the AeroScan 
                    project (agreement between ITA and Petrobras), with all rights 
                    and warranties belonging only to the institutions involved in 
                    the contract. Such a license applies because the project in 
                    question has hired the development team to manufacture a 
                    specific system with a predefined scope of functionality.
                </p>
                <span>version { softwareVersion }</span>
            </div>
        </AntModal>
    );
};

export default AboutSoftwareModal;