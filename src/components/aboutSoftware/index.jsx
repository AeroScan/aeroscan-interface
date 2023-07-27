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
                    Este software foi desenvolvido exclusivamente para utilização 
                    no projeto AeroScan (convênio entre ITA e Petrobras), com todos 
                    os direitos e garantias pertencentes apenas às instituições envolvidas 
                    no contrato. Tal licença se aplica pois o projeto em questão contratou 
                    a equipe de desenvolvimento para a fabricação de um sistema específico 
                    com um escopo de funcionalidades pré-definidos.
                </p>
                <span>version { softwareVersion }</span>
            </Container>
        </Modal>
    );
};

export default AboutSoftwareModal;