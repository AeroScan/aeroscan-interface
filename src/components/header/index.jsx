import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';
import { render } from '@testing-library/react';
import { RemoveToken, RetrieveToken } from '../../services/util';
import OverlayLoading from '../overlay/overlay';
import ModalComponet from '../modal';
import UploadButton from '../uploadButton';
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
import noiseAddLogo from '../../assets/img/pre-processing/noise-add.png';
import cubeReescaleLogo from '../../assets/img/pre-processing/cube-reescale.png';
import ransacLogo from '../../assets/img/processing/efficient-ransac.png';
import rAllocationLogo from '../../assets/img/configuration/resource-allocation.png';
import tourLogo from '../../assets/img/help/tour.png';
import aboutLogo from '../../assets/img/help/about.png';
import * as ModalActions from '../modal/actions';
import InterfaceTour from '../tour';
import { LoadCloud, SaveCloud, GenerateCad } from '../../services/api';

const Header = () => {
    

    const { setCloudFolderName } = useContext(GlobalContext);
    const { globalLoading, setGlobalLoading } = useContext(GlobalContext);
    const { setApplicationStatus } = useContext(GlobalContext);
    const { modalContent, setModalContent } = useContext(GlobalContext);
    const { setCones, setSpheres, setCylinders, setPlanes } = useContext(GlobalContext);

    const [activeTab, setActiveTab] = useState(0);

    const [tabsToShow, setTabsToShow] = useState([]);
    const [tokenVerified, setTokenVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const inputFile = useRef(null);

    const tabs = [
        {
            name: 'Files',
            step: 'second-step',
            procedures: [
                {
                    logo: loudCloudLogo,
                    label: 'Load Cloud',
                    component: <UploadButton inputFile={inputFile}/> 
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
                    submitCode: ModalActions.CROP_BOX
                },
                {
                    logo: voxelGridLogo,
                    label: 'Voxel Grid Filter',
                    submitCode: ModalActions.VOXEL_GRID
                },
                {
                    logo: sRemovalLogo,
                    label: 'Statistical Removal',
                    submitCode: ModalActions.STATISTICAL_REMOVAL
                },
                {
                    logo: nEstimationLogo,
                    label: 'Normal Estimation',
                    submitCode: ModalActions.NORMAL_ESTIMATION
                },
                {
                    logo: reescaleLogo,
                    label: 'Reescale',
                    submitCode: ModalActions.REESCALE
                },
                {
                    logo: centralizationLogo,
                    label: 'Centralization',
                    submitCode: ModalActions.CENTRALIZATION
                },
                {
                    logo: alignmentLogo,
                    label: 'Alignment',
                    submitCode: ModalActions.ALIGNMENT
                },
                {
                    logo: noiseAddLogo,
                    label: 'Noise Add',
                    submitCode: ModalActions.NOISE_ADD
                },
                {
                    logo: cubeReescaleLogo,
                    label: 'Cube Reescale',
                    submitCode: ModalActions.CUBE_REESCALE
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
                    submitCode: ModalActions.RANSAC
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
                component: <InterfaceTour />    
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
                    submitCode: ModalActions.GENERATE_PASSWORD
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

    const handleGenerateCad = async () => {
        setApplicationStatus("Generating cad...");
        setGlobalLoading(true);
        try {
            const result = await GenerateCad();
            if (!result) {
                setApplicationStatus("Failed to generate cad");
                setGlobalLoading(false);
                return;
            }
            setApplicationStatus("Cad saved");
            setGlobalLoading(false);
            return;
        } catch (error) {
            setApplicationStatus("Failed to save cad");
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
                render(element.component);
                inputFile.current.click();
                // handleLoadCloud();
                break;
            case "Save Cloud":
                handleSaveCloud();
                break;
            case "Save CAD":
                handleGenerateCad();
                break;
            case "Interface Tour":
                setActiveTab(0);
                render(element.component);
                break;
            default:
                setModalContent(element);
                break;
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
