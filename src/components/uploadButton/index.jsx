import React from 'react';
import { LoadCloud } from './style';

const UploadButton = ({ inputFile }) => {
    return(
        <input type="file" name="loadCloud"  ref={inputFile} style={{display: 'none'}}/>
    );
}

export default UploadButton;