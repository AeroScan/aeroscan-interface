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
  const [cloudFolderName, setCloudFolderName] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{
      applicationStatus, setApplicationStatus,
      planes, setPlanes,
      spheres, setSpheres,
      cylinders, setCylinders,
      cones, setCones,
      cloudFolderName, setCloudFolderName,
      globalLoading, setGlobalLoading,
    }}>
        {children}
    </GlobalContext.Provider>
  );
}

export default AppContext;