import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  
  // Footer
  const [applicationStatus, setApplicationStatus] = useState("Started");
  const [planes, setPlanes] = useState(0);
  const [spheres, setSpheres] = useState(0);
  const [cylinders, setCylinders] = useState(0);
  const [cones, setCones] = useState(0);

  // General
  const [cloudFile, setCloudFile] = useState({
    fileName: '',
    uuid: '',
    fileType: ''
  });
  const [cloudFolderName, setCloudFolderName] = useState("");
  const [typesView, setTypesView] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Loading
  const [loadings, setLoadings] = useState([]);

  return (
    <GlobalContext.Provider value={{
      applicationStatus, setApplicationStatus,
      planes, setPlanes,
      spheres, setSpheres,
      cylinders, setCylinders,
      cones, setCones,
      typesView, setTypesView,
      cloudFile, setCloudFile,
      cloudFolderName, setCloudFolderName,
      globalLoading, setGlobalLoading,
      modalContent, setModalContent,
      loadings, setLoadings,
    }}>
        {children}
    </GlobalContext.Provider>
  );
}

export default AppContext;