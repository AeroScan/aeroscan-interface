import React, { useState, useEffect } from 'react';
import { Container } from './style';
import { tabs } from './tabs';
import { render } from '@testing-library/react';
import { RemoveToken, RetrieveToken } from '../../services/util';

const Header = () => {

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

    const handleActions = (element) => {
        // console.log(element)
        switch(element.label){
            case "Logout":
                RemoveToken();

            case "Load Cloud":
            case "Save Cloud":
            case "Save Results":  
            default:
                render(element.component)
                break;
        }
    }
    
    return(
        <Container tabLength={tab.length}>
            {tab.map((element, index) => (
                <button key={index} className={activeTab === index ? "active" : ""} onClick={() => setActiveTab(index)}>
                    {element.name}
                </button>
            ))}
            <ul>
                {tabContent.map((element, index) => (
                    <li key={index} onClick={() => handleActions(element)}>
                        <img src={element.logo} alt={element.label} />
                        <p>{element.label}</p>  
                    </li>
                ))}
            </ul>
        </Container>  
    );
}

export default Header;
