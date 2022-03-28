import React from 'react';
import { useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Viewer from '../../components/viewer';
import { Container } from './style';
import MyContext from '../../context'

const MainContent = () => {

    // Footer
    const [planes, setPlanes] = useState(0);
    const [spheres, setSpheres] = useState(0);
    const [cylinders, setCylinders] = useState(0);
    const [cones, setCones] = useState(0);

    return(
        <Container>
            <MyContext.Provider value={{
                planes, setPlanes,
                spheres, setSpheres,
                cylinders, setCylinders,
                cones, setCones
            }}>
                <Header />
                <Viewer />
                <Footer />
            </MyContext.Provider>
        </Container>
    );
}

export default MainContent;