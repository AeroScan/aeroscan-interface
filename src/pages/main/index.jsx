import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Viewer from '../../components/viewer';
import AppContext from '../../context';
import { Container } from './style';

const MainContent = () => {
    return(
        <Container>
            <AppContext>
                <Header />
                <Viewer />
                <Footer />
            </AppContext>
        </Container>
    );
}

export default MainContent;