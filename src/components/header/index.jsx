import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';
import { render } from '@testing-library/react';
import { RemoveToken, RetrieveToken } from '../../services/util';
import OverlayLoading from '../overlay/overlay';
import ModalComponet from '../modal';

import loudCloudLogo from '../../assets/img/archives/load-cloud.png';
import saveCloudLogo from '../../assets/img/archives/save-cloud.png';
import saveResultsLogo from '../../assets/img/archives/save-results.png';
import cropBoxLogo from '../../assets/img/pre-processing/crop-box.png';
import voxelGridLogo from '../../assets/img/pre-processing/voxel-grid.png';
import sRemovalLogo from '../../assets/img/pre-processing/statistical-removal.png';
import nEstimationLogo from '../../assets/img/pre-processing/normal-estimation.png';
import reescaleLogo from '../../assets/img/pre-processing/reescale.png';
import centralizationLogo from '../../assets/img/pre-processing/centralization.png';
import alignmentLogo from '../../assets/img/pre-processing/alignment.png';
import ransacLogo from '../../assets/img/processing/efficient-ransac.png';
import rAllocationLogo from '../../assets/img/configuration/resource-allocation.png';
import tourLogo from '../../assets/img/help/tour.png';
import aboutLogo from '../../assets/img/help/about.png';
import * as ModalActions from '../modal/actions';
import InterfaceTour from '../tour';
import { LoadCloud, SaveCloud } from '../../services/api';

const Header = () => {
    const tabs = [
        {
            name: 'Files',
            step: 'second-step',
            procedures: [
                {
                    logo: loudCloudLogo,
                    label: 'Load Cloud', 
                },
                {
                    logo: saveCloudLogo,
                    label: 'Save Cloud'
                },
                {
                    logo: saveResultsLogo,
                    label: 'Save CAD'
                }
            ]
        },
        {
            name: 'Pre-Processing',
            step: 'fourth-step',
            procedures: [
                {
                    logo: cropBoxLogo,
                    label: 'Crop Box Filter',
                    component: { 
                        title: 'Crop Box Filter',
                        content: [
                            {
                                id: 'startingPoint',
                                label: 'Starting Point:',
                                input: ['x', 'y', 'z'],
                                inputType: 'text',
                                tooltipMessage: 'These fields set the minimum coordinates.',
                                errorMessage: 'Invalid Fields',
                            },
                            {
                                id: 'endingPoint',
                                label: 'Ending Point:',
                                input: ['x', 'y', 'z'],
                                inputType: 'text',
                                tooltipMessage: 'These fields set the maximum coordinates.',
                                errorMessage: 'Invalid Fields'
                            },
                        ],
                        buttonLabel: 'Process',
                        submitCode: ModalActions.CROP_BOX,
                    }
                },
                {
                    logo: voxelGridLogo,
                    label: 'Voxel Grid Filter',
                    component: { 
                        title: 'Voxel Grid Filter', 
                        content: [
                            {
                                id: 'leafSize',
                                label: 'Leaf Size:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the minimum distance between neighboring points in the cloud equally.',
                                errorMessage: 'Invalid Field'
                            }
                        ],
                        buttonLabel: 'Process',
                        submitCode: ModalActions.VOXEL_GRID,
                    },
                },
                {
                    logo: sRemovalLogo,
                    label: 'Statistical Removal',
                    component: { 
                        title: 'Statistical Removal',
                        labels: ['Mean:', 'Standard Deviation:'], 
                        content: [
                            {
                                id: 'mean',
                                label: 'Mean:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the average.',
                                errorMessage: 'Invalid Field',
                            },
                            {
                                id: 'standardDeviation',
                                label: 'Standard Deviation:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the standard deviation.',
                                errorMessage: 'Invalid Field',
                            },
                        ],
                    },
                    buttonLabel: 'Process',
                    submitCode: ModalActions.STATISTICAL_REMOVAL,
                },
                {
                    logo: nEstimationLogo,
                    label: 'Normal Estimation',
                    component: { 
                        title: 'Normal Estimation',
                        content: [
                            {
                                id: 'radius',
                                label: 'Radius:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the radius',
                            }
                        ],
                        buttonLabel: 'Process',
                        submitCode: ModalActions.NORMAL_ESTIMATION,
                    },
                },
                {
                    logo: reescaleLogo,
                    label: 'Reescale',
                    component: { 
                        title: 'Reescale',
                        labels: ['Scale:'],
                        content: [
                            {
                                id: 'scale',
                                label: 'Scale:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field update the scale of all cloud points.',
                                errorMessage: 'Invalid Field',
                            },
                        ],
                        buttonLabel: 'Process',
                        submitCode: ModalActions.REESCALE,
                    },
                },
                {
                    logo: centralizationLogo,
                    label: 'Centralization',
                    component: { 
                        title: 'Centralization',
                        buttonLabel: 'Process',
                        submitCode: ModalActions.CENTRALIZATION,
                    },
                },
                {
                    logo: alignmentLogo,
                    label: 'Alignment',
                    component: { 
                        title:'Alignment',
                        content: [
                            {
                                id: 'align',
                                label: 'Align:',
                                inputType: 'select',
                                tooltipMessage: 'The select set the alignment.',
                                errorMessage: 'Invalid Field'
                            }
                        ],
                        buttonLabel: 'Process',
                        submitCode: ModalActions.ALIGNMENT,
                    }
                },
            ],
        },
        {
            name: 'Processing',
            step: 'fifth-step',
            procedures: [
                {
                    logo: ransacLogo,
                    label: 'Efficient Ransac',
                    component: { 
                        title: 'Efficient Ransac',
                        content: [
                            {
                                id: 'scale',
                                label: 'Probability:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the method stop condition, probability of losing the largest primitive at each iteration.',
                                errorMessage: 'Invalid Field'
                            },
                            {
                                id: 'scale',
                                label: 'Min Points:',
                                input: ['int'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the minimum number of points for a sample to be considered a possible individual primitive.',
                                errorMessage: 'Invalid Field'
                            },
                            {
                                id: 'scale',
                                label: 'Cluster Epsilon:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the distance used for two neighboring points to be considered adjacent or not.',
                                errorMessage: 'Invalid Field'
                            },
                            {
                                id: 'scale',
                                label: 'Epsilon:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field set the minimum distance between a primitive and a point for it to be considered belonging to it.',
                                errorMessage: 'Invalid Field'
                            },
                            {
                                id: 'scale',
                                label: 'Normal Threshold:',
                                input: ['float'],
                                inputType: 'text',
                                tooltipMessage: 'This field limits how much the normal of a point can angularly differ from the normal of the primitive at the projection position of that point.',
                                errorMessage: 'Invalid Field'
                            }
                        ],
                        buttonLabel: 'Process',
                        submitCode: ModalActions.RANSAC,
                    },
                }
            ]    
        },
        {
            name: 'Help',
            step: 'sixth-step',
            procedures: [
            {
                logo: tourLogo,
                label: 'Interface Tour',
                component: <InterfaceTour/>    
            },
            {
                logo: aboutLogo,
                label: 'About Software'
            }
            ]
        },
        {
            name: 'Admin',
            procedures: [
                {
                    logo: rAllocationLogo,
                    label: 'Generate Password',
                    component: { 
                        title: 'Generate Password',
                        labels: ['Email', 'Password'],
                        inputs: 'text',
                        content: [
                            {
                                id: 'email',
                                label: 'E-mail:',
                                input: ['Type your e-mail'],
                                inputType: 'text',
                                tooltipMessage: 'This field generate a password through the e-mail.',
                                errorMessage: 'Invalid Email'
                            },
                            {
                                id: 'password',
                                label: 'Password:',
                                input: [''],
                                inputType: 'text',
                                tooltipMessage: 'This field show the password generated by md5.'
                            }
                        ],
                        buttonLabel: 'Generate',
                        submitCode: ModalActions.GENERATE_PASSWORD,
                    }
                }
            ]
        },
        {
            name: 'Account',
            step: 'seventh-step',
            procedures: [
            {
                logo: rAllocationLogo,
                label: 'Logout', 
            }
            ]
        }
    ];

    const { setCloudFolderName } = useContext(GlobalContext);
    const { globalLoading, setGlobalLoading } = useContext(GlobalContext);
    const { setApplicationStatus } = useContext(GlobalContext);
    const { modalContent, setModalContent } = useContext(GlobalContext);
    const { setCones, setSpheres, setCylinders, setPlanes } = useContext(GlobalContext);

    const [activeTab, setActiveTab] = useState(0);

    const [tabsToShow, setTabsToShow] = useState([]);
    const [tokenVerified, setTokenVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!tokenVerified) {
            if (RetrieveToken() === "admin@aeroscan.com") setIsAdmin(true);
            else setIsAdmin(false);
            setTokenVerified(true);
        }
    }, [tokenVerified]);

    useEffect(() => {
        if (isAdmin) setTabsToShow(tabs);
        else setTabsToShow(tabs.filter(tab => tab.name !== "Admin"));
    }, [isAdmin]);

    const[tabContent, setTabContent] = useState([]);

    useEffect(() => {
        tabsToShow.forEach((element, index) => {
            if(index === activeTab){
                setTabContent(element.procedures);
            }
        })
    }, [tabsToShow, activeTab]);

    const handleLoadCloud = async () => {
        setApplicationStatus("Loading cloud...");
        setGlobalLoading(true);
        try {
            const folderName = await LoadCloud();
            if (!folderName) {
                setApplicationStatus("Failed to load cloud");
                setCloudFolderName('');
                setGlobalLoading(false);
                return;
            }
            setApplicationStatus("Cloud loaded");
            setCloudFolderName(folderName);
            setGlobalLoading(false);
            return;
        } catch (error) {
            setApplicationStatus("Failed to load cloud");
            setCloudFolderName('');
            setGlobalLoading(false);
            return;
        }
    }

    const handleSaveCloud = async () => {
        setApplicationStatus("Saving cloud...");
        setGlobalLoading(true);
        try {
            const result = await SaveCloud();
            if (!result) {
                setApplicationStatus("Failed to save cloud");
                setGlobalLoading(false);
                return;
            }
            setApplicationStatus("Cloud saved");
            setGlobalLoading(false);
            return;
        } catch (error) {
            setApplicationStatus("Failed to save cloud");
            setGlobalLoading(false);
            return;
        }
    }

    const handleActions = (element) => {
        switch(element.label){
            case "Logout":
                RemoveToken();
                break;
            case "Load Cloud":
                handleLoadCloud();
                break;
            case "Save Cloud":
                handleSaveCloud();
                break;
            case "Save CAD":
                break;
            case "Interface Tour":
                setActiveTab(0)
                render(element.component)
                break;
            default:
                setModalContent(element.component)
        }
    }
    
    return(
        <Container tabLength={tabsToShow.length}>
            {modalContent !== null && <ModalComponet
                setCloudFolderName={setCloudFolderName}
                modalContent={modalContent}
                setModalContent={setModalContent}
                setGlobalLoading={setGlobalLoading}
                setCones={setCones}
                setCylinders={setCylinders}
                setPlanes={setPlanes}
                setSpheres={setSpheres}
            />}
            {globalLoading && <OverlayLoading />}
            {tabsToShow.map((element, index) => (
                <button key={index} className={activeTab === index ? "active" : ""} onClick={() => setActiveTab(index)} data-tut={element.step}>
                    {element.name}
                </button>
            ))}
            <ul>
                {tabContent.map((element, index) => (
                    <li key={index} onClick={() => handleActions(element)} data-tut="third-step">
                        <img src={element.logo} alt={element.label} />
                        <p>{element.label}</p>  
                    </li>
                ))}
            </ul>
        </Container>  
    );
}

export default Header;
