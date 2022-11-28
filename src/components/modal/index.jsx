import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import md5 from 'md5';
import * as ModalActions from './actions';
import $ from 'jquery';
import { customStyles, Container } from './style';
import { CloseOutlined, QuestionCircleFilled  } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';

const ModalComponet = ({ title, content, buttonLabel, submitCode }) => {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [selectField, setSelectField] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                
                return newLoadings;
            });
        }, 2000);
    };

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
                <CloseOutlined className='closeIcon' onClick={closeModal}/>
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
                            <Tooltip placement="right" title={element.tooltipMessage} overlayStyle={{ fontSize: '3.4rem' }}>
                                <QuestionCircleFilled />
                            </Tooltip>                  
                        </div>
                        <span className='error'>{error && element.errorMessage}</span>
                    </form>
                ))}
                <div className="buttons-container">
                    <Button loading={loadings[0]} onClick={() => enterLoading(0)}>
                        Process
                    </Button>
                    <Button className='cancel' onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
