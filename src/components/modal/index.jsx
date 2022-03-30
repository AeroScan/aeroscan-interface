import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import md5 from 'md5';
import { customStyles, Container, Close, Button } from './style';
import * as ModalActions from './actions';
import $ from 'jquery';


const ModalComponet = ({ title, content, buttonLabel, submitCode }) => {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [selectField, setSelectField] = useState("");

    const handleSubmit = () => {
        var values = $("input[name='parameters[]']")
            .map(function(){return $(this).val();}).get();
        
        switch (submitCode) {
            case ModalActions.GENERATE_PASSWORD:
                if(values[0]?.includes("@")){
                    const emailHash = md5(values[0].split('@')[0]);
                    const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                    document.getElementById("password").value = password;
                }else{
                    console.log("apresenta um erro na tela");
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
                {content?.map((element, contentIndex) => (
                    <div className="container" key={contentIndex}>
                        <label htmlFor={element.label}>{element.label}</label>
                        {element?.inputType === 'text' ?
                            element.input.map((values, inputIndex) => (
                                <input
                                    id={values}
                                    type={element.inputType}
                                    key={inputIndex}
                                    name='parameters[]'
                                    readOnly={values === ''}
                                    placeholder={element.label !== 'Password:' && values}
                                />
                            ))
                        :
                            <select 
                                aria-label="boolean" 
                                value={selectField}
                                onChange={event => setSelectField(event.target.value)}
                            >
                                <option value="" hidden>Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        }
                    </div>
                ))}
                <div className="buttons-container">
                    <Button onClick={handleSubmit}>{buttonLabel}</Button>
                    <Button cancel onClick={closeModal}>Cancel</Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
