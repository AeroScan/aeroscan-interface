import React, { useState, useEffect } from 'react';
import { LoadCloud } from '../../services/api';
import { message } from 'antd';

const UploadButton = ({ inputFile }) => {
    
    const [selectedFile, setSelectedFile] = useState(null);

    const Success = () => {
        message.open({
            type: 'success',
            content: 'Cloud uploaded',
            className: 'success-message',
            style: {
              fontSize: '4rem',
              marginTop: '20vh',
            },
          });
    };

    const Error = () => {
        message.open({
            type: 'error',
            content: 'Error loading cloud',
            className: 'error-message',
            style: {
              fontSize: '4rem',
              marginTop: '20vh',
            },
          });
    };
    
    useEffect(() => {
        
        sendFile()
        
    }, [selectedFile]);

    const sendFile = async() => {
        if(selectedFile){
            const dataForm = new FormData();
            dataForm.append('name', selectedFile.name);
            dataForm.append('file', selectedFile);
            dataForm.append('url_type', selectedFile.type);
            await LoadCloud(dataForm)
            .then( response => response.status == 200 ? Success() : Error()  )
            .catch(err => Error())
        }
    }

    return(
        <input 
            type="file" 
            name="loadCloud"  
            ref={inputFile} 
            style={{display: 'none'}}
            onChange={(e) => setSelectedFile(e.target.files[0])}
        />
    );
}

export default UploadButton;