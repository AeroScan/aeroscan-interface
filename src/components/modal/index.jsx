import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import md5 from 'md5';
import { customStyles, Container, Close, Button } from './style';

import * as ModalActions from './actions';


const ModalComponet = ({ title, labels, inputs, buttonLabel, submitCode, placeholder }) => {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [selectField, setSelectField] = useState("");

    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");

    const handleSubmit = () => {
        switch (submitCode) {
            case ModalActions.GENERATE_PASSWORD:
                if(firstInput.includes("@")){
                    const emailHash = md5(firstInput.split('@')[0]);
                    const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                    setSecondInput(password);
                }else{
                    console.log("apresenta um erro na tela")
                }
                break;
            case ModalActions.CENTRALIZATION:
            case ModalActions.CROP_BOX:
            case ModalActions.NORMAL_ESTIMATION:
            case ModalActions.REESCALE:
            case ModalActions.VOXEL_GRID:
            case ModalActions.STATISTICAL_REMOVAL:
            case ModalActions.ALIGNMENT:
            default:
                break;
        }
    }

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
   
                {labels.map((element, index) => (
                    <div className="label-container">
                        <label htmlFor={element}>{element}</label>
                        {inputs === 'number' ?
                            <input
                                id={element}
                                value={index === 0 ? firstInput : secondInput}
                                onChange={event => index === 0 ? setFirstInput(event.target.value) : setSecondInput(event.target.value)}
                                readOnly={element === "Password"}
                                placeholder={placeholder}
                            />
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
                    <Button
                        onClick={handleSubmit}
                    >{buttonLabel}</Button>
                    <Button cancel onClick={closeModal}>Cancel</Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
