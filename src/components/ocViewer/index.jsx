import React, { useEffect } from 'react';
import styled from 'styled-components';
import initOpenCascade from "opencascade.js";

const Wrapper = styled.div`
    background: #000;
    display: flex;
    flex-direction: column;
    height: 72vh;
    position: relative;
    z-index: 0;

    *{
        font-size: 1.6rem;
    }  
`

function stringToHash(string) {
  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

async function importSTEP() {
  try {
    const fileName = "C:\\Users\\migue\\Workspace\\AeroScan\\aeroscan-interface\\public\\clouds\\cellardeck.stp"
    console.log(fileName);
    const oc = await initOpenCascade();
    console.log(oc);
    const reader = new oc.STEPControl_Reader_1();
    console.log(reader);
    let readResult = reader.ReadFile(fileName);
    console.log(readResult);
    reader.PrintCheckLoad_1(true, 1);
    reader.PrintCheckLoad_2(true, 1);
    reader.PrintCheckLoad_3(true, 1);
  } catch (error) {
    console.log(error);
  }

  // let readResult = reader.ReadFile(fileName); // Read the file
  // if (readResult === 1) {
  //   reader.TransferRoots(); // Translate all transferable roots to OpenCascade
  //   let stepShape = reader.OneShape();         // Obtain the results of translation in one OCCT shape

  //   // Add to the externalShapes dictionary
  //   let obj = new oc.TopoDS_Shape(stepShape);
  //   obj.hash = stringToHash(fileName);
  //   console.log("Shape Import complete! Use sceneShapes.push(externalShapes['" + fileName + "']); to add it to the scene!");

  //   // Remove the file when we're done (otherwise we run into errors on reupload)
  //   oc.FS.unlink("/" + fileName);

  //   return obj;
  // } else {
  //   console.error("Something in OCCT went wrong trying to read " + fileName);
  //   return null;
  // }
}

const OpenCascadeViewer = () => {
  useEffect(() => {
    importSTEP();
  }, []);

  return (
    <Wrapper>Hello, world!</Wrapper>
  )
}

export default OpenCascadeViewer