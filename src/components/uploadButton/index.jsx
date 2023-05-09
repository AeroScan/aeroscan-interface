import React, { useState, useEffect } from 'react';

const UploadButton = ({ inputFile, handleLoadCloud }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const sendFile = async () => {
      if (selectedFile) {
        const dataForm = new FormData();
        dataForm.append('name', selectedFile.name);
        dataForm.append('file', selectedFile);
        dataForm.append('url_type', selectedFile.type);
        console.log("form", dataForm)

        await handleLoadCloud(dataForm, selectedFile)
      }
    }
    sendFile();
  }, [selectedFile]);

  return (
    <input
      type="file"
      name="loadCloud"
      ref={inputFile}
      style={{ display: 'none' }}
      onChange={(e) => setSelectedFile(e.target.files[0])}
    />
  );
}

export default UploadButton;