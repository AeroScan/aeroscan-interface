import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  // Footer
  const [applicationStatus, setApplicationStatus] = useState("Started");
  const [planes, setPlanes] = useState(0);
  const [spheres, setSpheres] = useState(0);
  const [cylinders, setCylinders] = useState(0);
  const [cones, setCones] = useState(0);

  //Parameters
  const[cropBox, setCropBox] = useState({
    startinPoint_x: 0,
    startinPoint_y: 0,
    startinPoint_z: 0,
    endingPoint_x: 0,
    endingPoint_y: 0,
    endingPoint_z: 0,
  });
  const[voxelGrid, setVoxelGrid] = useState({
    leafSize: 0,
  });
  const[statisticalRemoval, setStatisticalRemoval] = useState({
    mean: 0,
    standardDeviation: 0,
  });
  const[normalEstimation, setNormalEstimation] = useState({
    radius: 0,
  });
  const[reescale, setReescale] = useState({
    scale: 0,
  });
  const[centralization, setCentralization] = useState({});
  const[alignment, setAlignment] = useState({});
  const[noiseAdd, setNoiseAdd] = useState({
    limit: 0,
  });
  const[cubeReescale, setCubeReescale] = useState({
    factor: 0,
  });
  const[efficientRansac, setEfficientRansac] = useState({
    probability: 0,
    minPoints: 0,
    clusterEpsilon: 0,
    epsilon: 0,
    normalThreshold: 0,
  });

  // General
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
      cropBox, setCropBox,
      voxelGrid, setVoxelGrid,
      statisticalRemoval, setStatisticalRemoval,
      normalEstimation, setNormalEstimation,
      reescale, setReescale,
      noiseAdd, setNoiseAdd,
      cubeReescale, setCubeReescale,
      efficientRansac, setEfficientRansac,
      cloudFolderName, setCloudFolderName,
      typesView, setTypesView,
      globalLoading, setGlobalLoading,
      modalContent, setModalContent,
      loadings, setLoadings,
    }}>
        {children}
    </GlobalContext.Provider>
  );
}

export default AppContext;