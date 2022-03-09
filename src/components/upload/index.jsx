import React from 'react';
import Dropzone from 'react-dropzone';
import { DropContainer } from './style';
import $ from 'jquery';

const UploadCloud = () => {

    return ( 
        <Dropzone 
            maxFiles={1} 
            accept=".jpg, .jpeg, .png" 
            onDrop={acceptedFiles => console.log(acceptedFiles)}
        >
            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <DropContainer>
                    <button type="button" {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}> 
                        <input 
                        {...getInputProps()} multiple />
                        Drop your cloud here!
                    </button>
                </DropContainer>
            )}        
        </Dropzone>
    );
}
 
export default UploadCloud;

{/* <Dropzone 
            maxFiles={1} 
            accept=".jpg, .jpeg, .png" 
            onDrop={acceptedFiles => console.log(acceptedFiles)}
        >
            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <DropContainer>
                    <button type="button" {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}> 
                        <input 
                        {...getInputProps()} multiple />
                        Drop your cloud here!
                    </button>
                </DropContainer>
            )}        
        </Dropzone> */}