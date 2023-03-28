import React, { useState, createContext } from "react";

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
  const [typesView, setTypesView] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  // Modal Handlers
  const [alignmentModalOpen, setAlignmentModalOpen] = useState(false);
  const [centralizationModalOpen, setCentralizationModalOpen] = useState(false);
  const [cropBoxModalOpen, setCropBoxModalOpen] = useState(false);
  const [cubeReescaleModalOpen, setCubeReescaleModalOpen] = useState(false);
  const [efficientRansacModalOpen, setEfficientRansacModalOpen] = useState(false);
  const [generatePasswordModalOpen, setGeneratePasswordModalOpen] = useState(false);
  const [noiseAddModalOpen, setNoiseAddModalOpen] = useState(false);
  const [normalEstimationModalOpen, setNormalEstimationModalOpen] = useState(false);
  const [reescaleModalOpen, setReescaleModalOpen] = useState(false);
  const [statisticalRemovalModalOpen, setStatisticalRemovalModalOpen] = useState(false);
  const [voxelGridModalOpen, setVoxelGridModalOpen] = useState(false);

  // Loading
  const [loadings, setLoadings] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        applicationStatus,
        setApplicationStatus,
        planes,
        setPlanes,
        spheres,
        setSpheres,
        cylinders,
        setCylinders,
        cones,
        setCones,
        typesView,
        setTypesView,
        cloudFolderName,
        setCloudFolderName,
        globalLoading,
        setGlobalLoading,
        alignmentModalOpen,
        setAlignmentModalOpen,
        centralizationModalOpen, 
        setCentralizationModalOpen,
        cropBoxModalOpen,
        setCropBoxModalOpen,
        cubeReescaleModalOpen, 
        setCubeReescaleModalOpen,
        efficientRansacModalOpen, 
        setEfficientRansacModalOpen,
        generatePasswordModalOpen, 
        setGeneratePasswordModalOpen,
        noiseAddModalOpen, 
        setNoiseAddModalOpen,
        normalEstimationModalOpen, 
        setNormalEstimationModalOpen,
        reescaleModalOpen, 
        setReescaleModalOpen,
        statisticalRemovalModalOpen, 
        setStatisticalRemovalModalOpen,
        voxelGridModalOpen, 
        setVoxelGridModalOpen,
        loadings,
        setLoadings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
