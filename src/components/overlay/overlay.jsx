import React, { useContext } from 'react';
import ReactLoading from 'react-loading';
import { OverlayContainer } from './style';
import { GlobalContext } from '../../context';

const OverlayLoading = () => {
  const { applicationStatus } = useContext(GlobalContext);

  return (
    <OverlayContainer>
      <ReactLoading type={'spin'} color={'#FFF'} height="100px" width="100px" />
      <span>{`${applicationStatus.message}...`}</span>
    </OverlayContainer>
  );
};

export default OverlayLoading;