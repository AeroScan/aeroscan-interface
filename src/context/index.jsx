import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  
  // Footer
  const [applicationStatus, setApplicationStatus] = useState({
    status: "success",
    message: "Started",
  });
  const [planes, setPlanes] = useState(0);
  const [spheres, setSpheres] = useState(0);
  const [cylinders, setCylinders] = useState(0);
  const [cones, setCones] = useState(0);

  //tour
  const [tour, setTour] = useState({
    active: false
  })
  //Parameters
  const[cropBox, setCropBox] = useState({
    modalOpen: false,
    startinPoint_x: 0,
    startinPoint_y: 0,
    startinPoint_z: 0,
    endingPoint_x: 0,
    endingPoint_y: 0,
    endingPoint_z: 0,
  });
  const[voxelGrid, setVoxelGrid] = useState({
    modalOpen: false,
    leafSize: 0,
  });
  const[statisticalRemoval, setStatisticalRemoval] = useState({
    modalOpen: false,
    mean: 0,
    standardDeviation: 0,
  });
  const[normalEstimation, setNormalEstimation] = useState({
    modalOpen: false,
    radius: 0,
  });
  const[reescale, setReescale] = useState({
    modalOpen: false,
    scale: 0,
  });
  const[centralization, setCentralization] = useState({
    modalOpen: false,
  });
  const[alignment, setAlignment] = useState({
    modalOpen: false,
  });
  const[noiseAdd, setNoiseAdd] = useState({
    modalOpen: false,
    limit: 0,
  });
  const[cubeReescale, setCubeReescale] = useState({
    modalOpen: false,
    factor: 0,
  });
  const[efficientRansac, setEfficientRansac] = useState({
    modalOpen: false,
    probability: 0,
    minPoints: 0,
    clusterEpsilon: 0,
    epsilon: 0,
    normalThreshold: 0,
  });

  // General
  const [cloudFile, setCloudFile] = useState({
    fileName: '',
    uuid: '',
    fileType: ''
  });
  const [cloudFolderName, setCloudFolderName] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [typesView, setTypesView] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [generatePassword, setGeneratePassword] = useState({
    modalOpen: false,
  });

  // States
  const [efficientRansacApplied, setEfficientRansacApplied] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        applicationStatus, setApplicationStatus,
        planes, setPlanes,
        spheres, setSpheres,
        cylinders, setCylinders,
        cones, setCones,
        tour,setTour,
        typesView, setTypesView,
        cloudFile, setCloudFile,
        cloudFolderName, setCloudFolderName,
        sessionID, setSessionID,
        globalLoading, setGlobalLoading,
        efficientRansacApplied, setEfficientRansacApplied,
        cropBox, setCropBox,
        voxelGrid, setVoxelGrid,
        statisticalRemoval, setStatisticalRemoval,
        normalEstimation, setNormalEstimation,
        reescale, setReescale,
        centralization, setCentralization,
        alignment, setAlignment,
        noiseAdd, setNoiseAdd,
        cubeReescale, setCubeReescale,
        efficientRansac, setEfficientRansac,
        generatePassword, setGeneratePassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
