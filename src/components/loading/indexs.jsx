import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={'spin'} color={'#FFF'} height={'10%'} width={'10%'} />
);
 
export default Loading;