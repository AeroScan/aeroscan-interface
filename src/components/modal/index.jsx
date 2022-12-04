import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context';
import md5 from 'md5';
import * as ModalActions from './actions';
import $ from 'jquery';
import { Container } from './style';
import { CloseOutlined, QuestionCircleFilled  } from '@ant-design/icons';
import { Modal, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { ApplyAlignment, ApplyCentralization, ApplyCropBox, ApplyCubeReescale, ApplyEfficientRansac, ApplyNoiseAdd, ApplyNormalEstimation, ApplyReescale, ApplyStatisticalOutlierRemoval, ApplyVoxelGrid } from '../../services/api';

const ModalComponet = ({ setCloudFolderName, modalContent, setModalContent, setGlobalLoading, setCylinders, setCones, setSpheres, setPlanes }) => {
    const { setApplicationStatus } = useContext(GlobalContext);

    const [selectField, setSelectField] = useState("");
    const [error, setError] = useState(false);

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
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {

        console.log('hello world')

        var values = $("input[name='parameters[]']")
            .map(function(){return $(this).val();}).get();
        if (values.length > 0 && !handleValidation(values)) {
            handleCloseModal();
            return;
        }
        
        switch (modalContent.submitCode) {
            case ModalActions.GENERATE_PASSWORD:
                if (values[0]?.includes("@")) {
                    setError(false);
                    const emailHash = md5(values[0].split('@')[0]);
                    const password = `${emailHash.slice(0, 5)}${emailHash.slice(emailHash.length - 5, emailHash.length)}`;
                    document.getElementById("password").value = password;
                } else {
                    setError(true);
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
                        break;
                    }
                    setApplicationStatus('Crop box applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply crop box');
                    break;
                }
            case ModalActions.VOXEL_GRID:
                try {
                    const response = await ApplyVoxelGrid({ leaf: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply voxel grid');
                        break;
                    }
                    setApplicationStatus('Voxel grid applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply voxel grid');
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
                        break;
                    }
                    setApplicationStatus('Statistical removal applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply statistical removal');
                    break;
                }
            case ModalActions.NORMAL_ESTIMATION:
                try {
                    const response = await ApplyNormalEstimation({ radius: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply normal estimation');
                        break;
                    }
                    setApplicationStatus('Normal estimation applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply normal estimation');
                    break;
                }
            case ModalActions.REESCALE:
                try {
                    const response = await ApplyReescale({ factor: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply reescale');
                        break;
                    }
                    setApplicationStatus('Reescale applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply reescale');
                    break;
                }
            case ModalActions.CENTRALIZATION:
                try {
                    const response = await ApplyCentralization();
                    if (!response) {
                        setApplicationStatus('Failed to apply centralization');
                        break;
                    }
                    setApplicationStatus('Centralization applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply centralization');
                    break;
                }
            case ModalActions.ALIGNMENT:
                try {
                    const response = await ApplyAlignment();
                    if (!response) {
                        setApplicationStatus('Failed to apply alignment');
                        break;
                    }
                    setApplicationStatus('Alignment applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply alignment');
                    break;
                }
            case ModalActions.NOISE_ADD:
                try {
                    const response = await ApplyNoiseAdd({ limit: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply noise add');
                        break;
                    }
                    setApplicationStatus('Noise add applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply noise add');
                    break;
                }
            case ModalActions.CUBE_REESCALE:
                try {
                    const response = await ApplyCubeReescale({ factor: values[0] });
                    if (!response) {
                        setApplicationStatus('Failed to apply cube reescale');
                        break;
                    }
                    setApplicationStatus('Cube reescale applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply cube reescale');
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
                        break;
                    }
                    setApplicationStatus('Efficient ransac applied');
                    setCloudFolderName(response);
                    break;
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply efficient ransac');
                    break;
                }
            default:
                break;
        }

        handleCloseModal();
    }

    const handleCloseModal = () => {
        setModalContent(null);
    }

    return (
        <Modal open={modalContent !== null} footer={null} width={'40%'} closable={false} centered>
            <Container>
                <CloseOutlined className='closeIcon' onClick={handleCloseModal}/>
                <h1>{modalContent.title}</h1>
                {modalContent.content?.map((element, contentIndex) => (
                    <form key={contentIndex} onSubmit={handleSubmit} id="myform">
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
                            <Tooltip placement="right" title={element.tooltipMessage} overlayStyle={{ fontSize: '3rem' }}>
                                <QuestionCircleFilled />
                            </Tooltip>                  
                        </div>
                        <span className='error'>{error && element.errorMessage}</span>
                    </form>
                ))}
                <div className="buttons-container">
                    <Button loading={loadings[0]} onClick={() => enterLoading(0)} htmlType='submit' form="myform">
                        Process
                    </Button>
                    <Button className='cancel' onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
