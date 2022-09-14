import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';
import { tabs } from './tabs';
import { render } from '@testing-library/react';
import { RemoveToken, RetrieveToken } from '../../services/util';
import { LoadCloud } from '../../services/api';
import OverlayLoading from '../overlay/overlay';

const Header = () => {
    const { setCloudFolderName } = useContext(GlobalContext);
    const { globalLoading, setGlobalLoading } = useContext(GlobalContext);
    const { setApplicationStatus } = useContext(GlobalContext);

    const [activeTab, setActiveTab] = useState(0);

    const[tab, setTab] = useState([]);
    const[tabContent, setTabContent] = useState([]);

    useEffect(() => {
        if (RetrieveToken() !== "admin@aeroscan.com") {
            setTab(tabs.filter(element => element.name !== "Admin"));
        }else{
            setTab(tabs);
        }
    }, []);

    useEffect(() => {
        tab.map((element, index) => {
            if(index === activeTab){
                setTabContent(element.procedures);
            }
        })
    }, [tab, activeTab]);

    const handleLoadCloud = async () => {
        setApplicationStatus("Loading cloud...");
        setGlobalLoading(true);
        const folderName = await LoadCloud();
        setCloudFolderName(`cloud/${folderName}/metadata.json`);
        setGlobalLoading(false);
        setApplicationStatus("Cloud loaded");
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
                break;
            case "Save Results":  
                break;
            case "Interface Tour":
                setActiveTab(0)
                render(element.component)
                break;
            default:
                render(element.component)
        }
    }
    
    return(
        <Container tabLength={tab.length}>
            {globalLoading && <OverlayLoading />}
            {tab.map((element, index) => (
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
