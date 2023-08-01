import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Container } from '../modal/style';
import { softwareVersion } from '../../services/contants';

const AboutSoftwareModal = () => {

    const { aboutSoftware, setAboutSoftware } = useContext(GlobalContext);

    const closeModal = () => {
        setAboutSoftware({
          modalOpen: false,
        });
    };

    return(
        <Modal
            open={aboutSoftware.modalOpen}
            footer={null}
            width={"40%"}
            closable={false}
            maskClosable={true}
            centered
            destroyOnClose
        >
            <Container>
                <CloseOutlined className="closeIcon" onClick={closeModal} />
                <h1>About Software</h1>
                <p>
                    This software was developed exclusively for use in the AeroScan 
                    project (agreement between ITA and Petrobras), with all rights 
                    and warranties belonging only to the institutions involved in 
                    the contract. Such a license applies because the project in 
                    question has hired the development team to manufacture a 
                    specific system with a predefined scope of functionality.
                </p>
                <span>version { softwareVersion }</span>
            </Container>
        </Modal>
    );
};

export default AboutSoftwareModal;