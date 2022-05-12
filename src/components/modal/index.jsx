import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Loading from '../loading/index';
import Tooltip from '../tooltip';
import md5 from 'md5';
import * as ModalActions from './actions';
import $ from 'jquery';
import { customStyles, Container, Close, Button } from './style';


const ModalComponet = ({ title, content, buttonLabel, submitCode }) => {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [selectField, setSelectField] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleValidation = (inputValues) => {
        if(inputValues.every(element => element === '')){
            setError(true);
        }
    }

    const handleSubmit = () => {
        var values = $("input[name='parameters[]']")
            .map(function(){return $(this).val();}).get();
        
        switch (submitCode) {
            case ModalActions.GENERATE_PASSWORD:
                setLoading(true);
                setTimeout(() => {
                    if(values[0]?.includes("@")){
                        setError(false);
                        const emailHash = md5(values[0].split('@')[0]);
                        const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                        document.getElementById("password").value = password;
                        setLoading(false);
                    }else{
                        console.log("apresenta um erro na tela");
                        setError(true);
                        setLoading(false);
                    }
                }, 2000)
                break;
            case ModalActions.CENTRALIZATION:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            case ModalActions.CROP_BOX:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            case ModalActions.NORMAL_ESTIMATION:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            case ModalActions.REESCALE:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            case ModalActions.VOXEL_GRID:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            case ModalActions.STATISTICAL_REMOVAL:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            case ModalActions.ALIGNMENT:
                setLoading(true);
                setTimeout(() => {
                    handleValidation(values);
                    setLoading(false);
                }, 2000)
                break;
            default:
        }
    }

    const closeModal = () => {
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
                    <form key={contentIndex}>
                        <div className='container'>
                            <label htmlFor={element.label}>{element.label}</label>
                            {element?.inputType === 'text' ?
                                element.input.map((values, inputIndex) => (
                                    <input
                                        id={element.id}
                                        key={inputIndex}
                                        name='parameters[]'
                                        placeholder={values}
                                        readOnly={element.id === 'password'}
                                        type={element.inputType}
                                        onFocus={() => setError(false)}
                                    />
                                ))
                            :
                                <select 
                                    aria-label="boolean" 
                                    onChange={event => setSelectField(event.target.value)}
                                    value={selectField}    
                                >
                                    <option value="" hidden>Select</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            }
                            <Tooltip text={element.tooltipMessage} position={'right'} background={'393e46'} />
                        </div>
                        <span>{error && element.errorMessage}</span>
                    </form>
                ))}
                <div className="buttons-container">
                    <Button onClick={handleSubmit}>
                        {loading ? <Loading  height={'20px'} width={'20px'}/> : buttonLabel}
                    </Button>
                    <Button cancel onClick={closeModal}>Cancel</Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
