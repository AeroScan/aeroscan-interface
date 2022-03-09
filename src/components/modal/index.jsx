import React, { useState } from 'react';
import Modal from 'react-modal';
import UploadCloud from '../upload';
import { customStyles, Container, Close } from './style';

const ModalComponet = ({ title }) => {

    const [modalIsOpen,setIsOpen] = useState(true);

    const closeModal = () =>{
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <Container>
                <Close onClick={closeModal}/>
                <h1>{title}</h1>
                {title === 'Load Cloud' ? <UploadCloud /> : <p>Content</p>}
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
