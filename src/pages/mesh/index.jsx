import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import MeshViewer from "../../components/meshViewer";
import AppContext from "../../context";

const Mesh = () => {
    return(
        <AppContext>
            <Header />
            <MeshViewer />
        </AppContext>
    );
};

export default Mesh;