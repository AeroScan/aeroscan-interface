import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {

  // Footer
  const [planes, setPlanes] = useState(0);
  const [spheres, setSpheres] = useState(0);
  const [cylinders, setCylinders] = useState(0);
  const [cones, setCones] = useState(0);

  return (
    <GlobalContext.Provider value={{ planes, setPlanes, spheres, setSpheres, cylinders, setCylinders, cones, setCones }}>
        {children}
    </GlobalContext.Provider>
  );
}

export default AppContext;