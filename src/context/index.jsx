import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

const AppContext = ({ children }) => {

  // Footer
  const [applicationStatus, setApplicationStatus] = useState({
    status: "success",
    message: "Started",
  });
  const [unlabeled, setUnlabeled] = useState({
    visible: false,
    amount: 0,
  });
  const [planes, setPlanes] = useState({
    visible: false,
    amount: 0,
  });
  const [spheres, setSpheres] = useState({
    visible: false,
    amount: 0,
  });
  const [cylinders, setCylinders] = useState({
    visible: false,
    amount: 0,
  });
  const [cones, setCones] = useState({
    visible: false,
    amount: 0,
  });

  //tour
  const [tour, setTour] = useState({
    active: false
  })
  //Parameters
  const [cropBox, setCropBox] = useState({
    modalOpen: false,
    startingPoint_x: "X",
    startingPoint_y: "Y",
    startingPoint_z: "Z",
    endingPoint_x: "X",
    endingPoint_y: "Y",
    endingPoint_z: "Z",
  });
  const [voxelGrid, setVoxelGrid] = useState({
    modalOpen: false,
    leafSize: "Leaf Size",
  });
  const [statisticalRemoval, setStatisticalRemoval] = useState({
    modalOpen: false,
    mean: "Mean",
    standardDeviation: "Standard Deviation",
  });
  const [normalEstimation, setNormalEstimation] = useState({
    modalOpen: false,
    radius: "Radius",
  });
  const [reescale, setReescale] = useState({
    modalOpen: false,
    scale: "Scale",
  });
  const [centralization, setCentralization] = useState({
    modalOpen: false,
  });
  const [alignment, setAlignment] = useState({
    modalOpen: false,
  });
  const [noiseAdd, setNoiseAdd] = useState({
    modalOpen: false,
    limit: "Limit",
  });
  const [cubeReescale, setCubeReescale] = useState({
    modalOpen: false,
    factor: "Factor",
  });
  const [efficientRansac, setEfficientRansac] = useState({
    modalOpen: false,
    probability: "Probability",
    minPoints: "Min Points",
    clusterEpsilon: "Cluster Epsilon",
    epsilon: "Epsilon",
    normalThreshold: "Normal Threshold",
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
  const [aboutSoftware, setAboutSoftware] = useState({
    modalOpen: false,
  });
  const [generatePassword, setGeneratePassword] = useState({
    modalOpen: false,
  });

  // States
  const [efficientRansacApplied, setEfficientRansacApplied] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        applicationStatus, setApplicationStatus,
        unlabeled, setUnlabeled,
        planes, setPlanes,
        spheres, setSpheres,
        cylinders, setCylinders,
        cones, setCones,
        tour, setTour,
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
        aboutSoftware, setAboutSoftware,
        generatePassword, setGeneratePassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
