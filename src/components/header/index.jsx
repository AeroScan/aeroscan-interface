import React, { useState, useEffect } from 'react';
import { Container } from './style';
import { tabs } from './tabs';
import { render } from '@testing-library/react';

const Header = () => {

    const [activeTab, setActiveTab] = useState(0);

    const[tab, setTab] = useState([]);
    const[tabContent, setTabContent] = useState([]);

    useEffect(() => {
        setTab(tabs);
    }, []);

    useEffect(() => {
        tab.map((element, index) => {
            if(index === activeTab){
                setTabContent(element.procedures);
            }
        })
    }, [tab, activeTab]);

    return(
        <Container>
            {tab.map((element, index) => (  
                <button key={index} className={activeTab === index ? "active" : ""} onClick={() => setActiveTab(index)}>
                    {element.name}
                </button>      
            ))}
            <ul>
                {tabContent.map((element, index) => (
                    <li key={index} onClick={() => render(element.component)}>
                        <img src={element.logo} alt={element.label} />
                        <p>{element.label}</p>  
                    </li>
                ))}
            </ul>
        </Container>  
    );
}

export default Header;
