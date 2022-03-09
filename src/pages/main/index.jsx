import React from 'react';
import { useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Viewer from '../../components/viewer';
import { Container } from './style';

const MainContent = () => {
    return(
        <Container>
            <Header />
            <Viewer />
            <Footer />
        </Container>
    );
}

export default MainContent;