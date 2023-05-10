import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';
import { render } from '@testing-library/react';
import { RemoveToken, RetrieveToken } from '../../services/util';
import OverlayLoading from '../overlay/overlay';
import AlignmentModal from '../alignment';
import CentralizationModal from '../centralization';
import CropBoxModal from '../cropBox';
import CubeReescaleModal from '../cubeReescale';
import EfficientRansacModal from '../efficientRansac';
import GeneratePasswordModal from '../generatePassword';
import NormalEstimationModal from '../normalEstimation';
import ReescaleModal from '../reescale';
import StatisticalRemovalModal from '../statisticalRemoval';
import VoxelGridModal from '../voxelGrid';
import NoiseAddModal from '../noiseAdd';
import loudCloudLogo from '../../assets/img/archives/load-cloud.svg';
import saveCloudLogo from '../../assets/img/archives/save-cloud.svg';
import saveResultsLogo from '../../assets/img/archives/save-results.svg';
import cropBoxLogo from '../../assets/img/pre-processing/crop-box.svg';
import voxelGridLogo from '../../assets/img/pre-processing/voxel-grid.svg';
import sRemovalLogo from '../../assets/img/pre-processing/statistical-removal.svg';
import nEstimationLogo from '../../assets/img/pre-processing/normal-estimation.svg';
import reescaleLogo from '../../assets/img/pre-processing/reescale.svg';
import centralizationLogo from '../../assets/img/pre-processing/centralization.svg';
import alignmentLogo from '../../assets/img/pre-processing/alignment.svg';
import noiseAddLogo from '../../assets/img/pre-processing/noise-add.png';
// import cubeReescaleLogo from '../../assets/img/pre-processing/cube-reescale.svg';
import ransacLogo from '../../assets/img/processing/efficient-ransac.svg';
import rAllocationLogo from '../../assets/img/configuration/resource-allocation.svg';
import tourLogo from '../../assets/img/help/tour.svg';
import aboutLogo from '../../assets/img/help/about.svg';
import InterfaceTour from '../tour';
import { LoadCloud, SaveCloud, GenerateCad } from '../../services/api';


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
                    label: 'Crop Box Filter'
                },
                {
                    logo: voxelGridLogo,
                    label: 'Voxel Grid Filter'
                },
                {
                    logo: sRemovalLogo,
                    label: 'Statistical Removal'
                    
                },
                {
                    logo: nEstimationLogo,
                    label: 'Normal Estimation'
                },
                {
                    logo: reescaleLogo,
                    label: 'Reescale'
                },
                {
                    logo: centralizationLogo,
                    label: 'Centralization'
                },
                {
                    logo: alignmentLogo,
                    label: 'Alignment'
                },
                {
                    logo: noiseAddLogo,
                    label: 'Noise Add'
                },
                // {
                //     logo: cubeReescaleLogo,
                //     label: 'Cube Reescale',
                // },
            ],
        },
        {
            name: 'Processing',
            step: 'fifth-step',
            procedures: [
                {
                    logo: ransacLogo,
                    label: 'Efficient Ransac',
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
    const { setCones, setSpheres, setCylinders, setPlanes } = useContext(GlobalContext);

    // Modals handling
    
    const { cropBox, setCropBox } = useContext(GlobalContext);
    const { voxelGrid, setVoxelGrid } = useContext(GlobalContext);
    const { statisticalRemoval, setStatisticalRemoval } = useContext(GlobalContext);
    const { normalEstimation, setNormalEstimation } = useContext(GlobalContext);
    const { reescale, setReescale } = useContext(GlobalContext);
    const { centralization, setCentralization } = useContext(GlobalContext);
    const { alignment, setAlignment } = useContext(GlobalContext);
    const { cubeReescale, setCubeReescale } = useContext(GlobalContext);
    const { noiseAdd, setNoiseAdd } = useContext(GlobalContext);
    const { efficientRansac, setEfficientRansac } = useContext(GlobalContext);
    const { generatePassword, setGeneratePassword } = useContext(GlobalContext);

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
                handleLoadCloud();
                break;
            case "Save Cloud":
                handleSaveCloud();
                break;
            case "Save CAD":
                handleGenerateCad();
                break;
            case "Interface Tour":
                setActiveTab(0)
                render(element.component)
                break;
            case "Alignment":
                setAlignment({
                    modalOpen: true,
                });
                break;
            case "Centralization":
                setCentralization({
                    modalOpen: true,
                });
                break;
            case "Crop Box Filter":
                setCropBox({
                    modalOpen: true,
                });
                break;
            case "Cube Reescale":
                setCubeReescale({
                    modalOpen: true,
                });
                break;
            case "Efficient Ransac":
                setEfficientRansac({
                    modalOpen: true,
                });
                break;
            case "Generate Password":
                setGeneratePassword({
                    modalOpen: true,
                });
                break;
            case "Noise Add":
                setNoiseAdd({
                    modalOpen: true,
                });
                break;
            case "Normal Estimation":
                setNormalEstimation({
                    modalOpen: true,
                });
                break;
            case "Reescale":
                setReescale({
                    modalOpen: true,
                });
                break;
            case "Statistical Removal":
                setStatisticalRemoval({
                    modalOpen: true,
                });
                break;
            case "Voxel Grid Filter":
                setVoxelGrid({
                    modalOpen: true,
                });
                break;
            default:
                break;
        }
    }
    
    return(
        <Container tabLength={tabsToShow.length}>
            {alignment.modalOpen && <AlignmentModal />}
            {centralization.modalOpen && <CentralizationModal />}
            {cropBox.modalOpen && <CropBoxModal />}
            {cubeReescale.modalOpen && <CubeReescaleModal />}
            {efficientRansac.modalOpen && <EfficientRansacModal />}
            {generatePassword.modalOpen && <GeneratePasswordModal />}
            {noiseAdd.modalOpen && <NoiseAddModal />}
            {normalEstimation.modalOpen && <NormalEstimationModal />}
            {reescale.modalOpen && <ReescaleModal />}
            {statisticalRemoval.modalOpen && <StatisticalRemovalModal />}
            {voxelGrid.modalOpen && <VoxelGridModal />}
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
