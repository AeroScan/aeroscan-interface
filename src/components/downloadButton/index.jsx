import React from 'react';

const DownloadButton = ({ downloadLink, file }) => {
  return (
    <a href={file} ref={downloadLink}></a>
  );
}

export default DownloadButton;