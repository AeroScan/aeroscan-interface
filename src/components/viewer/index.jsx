import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from './style';
import $ from 'jquery';

const Viewer = () => {
    const { Potree } = window;

    const potree_render_area = useRef(null);

    useEffect(() => {
        const viewerElem = potree_render_area.current

        const viewer = new Potree.Viewer(viewerElem);

        viewer.setEDLEnabled(false);
        viewer.setFOV(60);
        viewer.setPointBudget(1 * 1000 * 1000);
        viewer.loadSettingsFromURL();

        viewer.loadGUI(() => {
            viewer.setLanguage('en');
            $("#menu_appearance").next().show();
            viewer.toggleSidebar();
        });

        const url = `pointclouds/page/metadata.json`;
        // Load and add point cloud to scene
        Potree.loadPointCloud(url).then(e => {
            viewer.scene.addPointCloud(e.pointcloud);
            const { material } = e.pointcloud;
            material.size = 1;
            material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

            e.pointcloud.position.x += 3;
            e.pointcloud.position.y -= 3;
            e.pointcloud.position.z += 4;
            viewer.fitToScreen();
        }, error => console.err(`ERROR: ${error}`));
    },[]);

    return(
        <Wrapper id="potree-root">
            <div ref={potree_render_area} id="potree_render_area" />
            <div id="potree_sidebar_container" />
        </Wrapper>
    );
}

export default Viewer;