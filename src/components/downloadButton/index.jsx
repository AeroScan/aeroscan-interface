import React from 'react';

const DownloadButton = ({ downloadLink, handleLoadCloud, file }) => {
  return (
    <a href={file} ref={downloadLink}></a>
  );
}

export default DownloadButton;