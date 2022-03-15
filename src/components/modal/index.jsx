import React, { useState } from 'react';
import Modal from 'react-modal';
import { customStyles, Container, Close, Button } from './style';

const ModalComponet = ({ title, labels, inputs }) => {

    const [modalIsOpen,setIsOpen] = useState(true);

    const [selectField, setSelectField] = useState("");

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
   
                {labels.map(element => (
                    <div className="label-container">
                        <label htmlFor={element}>{element}</label>
                        {inputs === 'number' ?
                            <input id={element} />
                        :
                            <select 
                            aria-label="boolean" 
                            value={selectField}
                            onChange={event => setSelectField(event.target.value)}>
                                <option value="" hidden>Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        }
                    </div>
                ))}

                <div className="buttons-container">
                    <Button>Process</Button>
                    <Button cancel onClick={closeModal}>Cancel</Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
