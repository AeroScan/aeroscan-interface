import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context';
import Modal from 'react-modal';
import Loading from '../loading/index';
import Tooltip from '../tooltip';
import md5 from 'md5';
import * as ModalActions from './actions';
import $ from 'jquery';
import { customStyles, Container, Close, Button } from './style';
import { ApplyAlignment, ApplyCentralization, ApplyCropBox, ApplyCubeReescale, ApplyEfficientRansac, ApplyNoiseAdd, ApplyNormalEstimation, ApplyReescale, ApplyStatisticalOutlierRemoval, ApplyVoxelGrid } from '../../services/api';


const ModalComponet = ({ setCloudFolderName, modalContent, setModalContent, setGlobalLoading, setCylinders, setCones, setSpheres, setPlanes }) => {
    const { setApplicationStatus } = useContext(GlobalContext);

    const [selectField, setSelectField] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleValidation = (inputValues) => {
        if(inputValues.every(element => element === '')){
            setError(true);
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        setLoading(true);

        var values = $("input[name='parameters[]']")
            .map(function(){return $(this).val();}).get();
        if (values.length > 0 && !handleValidation(values)) {
            setLoading(false);
            closeModal();
            return;
        }
        
        switch (modalContent.submitCode) {
            case ModalActions.GENERATE_PASSWORD:
                if (values[0]?.includes("@")) {
                    setError(false);
                    const emailHash = md5(values[0].split('@')[0]);
                    const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                    document.getElementById("password").value = password;
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
                break;
            case ModalActions.CROP_BOX:
                try {
                    const response = await ApplyCropBox({
                        min_x: values[0],
                        min_y: values[1],
                        min_z: values[2],
                        max_x: values[3],
                        max_y: values[4],
                        max_z: values[5],
                    });
                    if (!response) {
                        setApplicationStatus('Failed to apply crop box');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Crop box applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply crop box');
                    setLoading(false);
                    break;
                }
            case ModalActions.VOXEL_GRID:
                try {
                    const response = await ApplyVoxelGrid({ leaf: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply voxel grid');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Voxel grid applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply voxel grid');
                    setLoading(false);
                    break;
                }
            case ModalActions.STATISTICAL_REMOVAL:
                try {
                    const response = await ApplyStatisticalOutlierRemoval({
                        mean: values[0],
                        std: values[1],
                    });
                    if (!response) {
                        setApplicationStatus('Failed to apply statistical removal');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Statistical removal applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply statistical removal');
                    setLoading(false);
                    break;
                }
            case ModalActions.NORMAL_ESTIMATION:
                try {
                    const response = await ApplyNormalEstimation({ radius: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply normal estimation');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Normal estimation applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply normal estimation');
                    setLoading(false);
                    break;
                }
            case ModalActions.REESCALE:
                try {
                    const response = await ApplyReescale({ factor: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply reescale');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Reescale applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply reescale');
                    setLoading(false);
                    break;
                }
            case ModalActions.CENTRALIZATION:
                try {
                    const response = await ApplyCentralization();
                    if (!response) {
                        setApplicationStatus('Failed to apply centralization');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Centralization applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply centralization');
                    setLoading(false);
                    break;
                }
            case ModalActions.ALIGNMENT:
                try {
                    const response = await ApplyAlignment();
                    if (!response) {
                        setApplicationStatus('Failed to apply alignment');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Alignment applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply alignment');
                    setLoading(false);
                    break;
                }
            case ModalActions.NOISE_ADD:
                try {
                    const response = await ApplyNoiseAdd({ limit: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply noise add');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Noise add applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply noise add');
                    setLoading(false);
                    break;
                }
            case ModalActions.CUBE_REESCALE:
                try {
                    const response = await ApplyCubeReescale({ factor: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply cube reescale');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Cube reescale applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply cube reescale');
                    setLoading(false);
                    break;
                }
            case ModalActions.RANSAC:
                try {
                    const response = await ApplyEfficientRansac({
                        probability: values[0],
                        min_points: values[1],
                        epsilon: values[2],
                        cluster_epsilon: values[3],
                        normal_threshold: values[4],
                    });
                    if (!response) {
                        setApplicationStatus('Failed to apply efficient ransac');
                        setLoading(false);
                        break;
                    }
                    setApplicationStatus('Efficient ransac applied');
                    setCloudFolderName(response);
                    setLoading(false);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply efficient ransac');
                    setLoading(false);
                    break;
                }
            default:
                break;
        }

        closeModal();
    }

    const closeModal = () => {
        setModalContent(null);
    }

    return (
        <Modal
            isOpen={modalContent !== null}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <Container>
                <Close onClick={closeModal}/>
                <h1>{modalContent.title}</h1>
                {modalContent.content?.map((element, contentIndex) => (
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
                            <Tooltip text={element.tooltipMessage} position={'left'} background={'393e46'} />
                        </div>
                        <span>{error && element.errorMessage}</span>
                    </form>
                ))}
                <div className="buttons-container">
                    <Button onClick={handleSubmit}>
                        {loading ? <Loading  height={'20px'} width={'20px'}/> : modalContent.buttonLabel}
                    </Button>
                    <Button cancel onClick={closeModal}>Cancel</Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
