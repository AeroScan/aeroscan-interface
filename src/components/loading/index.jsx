import React from 'react';
import ReactLoading from 'react-loading';
import { Container } from './style';
 
const Loading = ({ height, width }) => (
    <Container>
        <ReactLoading type={'spin'} color={'#FFF'} height={height} width={width} />
    </Container>
);
 
export default Loading;