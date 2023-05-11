import React from 'react';
import ReactLoading from 'react-loading';
import { OverlayContainer } from './style';

const OverlayLoading = () => (
  <OverlayContainer>
    <ReactLoading type={'spin'} color={'#FFF'} height="100px" width="100px" />
  </OverlayContainer>
);

export default OverlayLoading;