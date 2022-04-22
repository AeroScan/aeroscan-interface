import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Wrapper, AxisWrapper, AxisImg } from './style';
import $ from 'jquery';

import srcAxis from '../../assets/img/viewer/axis.png';

const Viewer = () => {
    const { Potree } = window;

    const [pageLoaded, setPageLoaded] = useState(false);
    const [viewer, setViewer] = useState(null);
    const [viewerConfigured, setViewerConfigured] = useState(false);

    const potree_render_area = useRef(null);
    const { cloudFolderName } = useContext(GlobalContext);

    useEffect(() => {
        if (Potree && !pageLoaded) {
            const viewerElem = potree_render_area.current
            setViewer(new Potree.Viewer(viewerElem));
            setPageLoaded(true);
        }
    }, [Potree, pageLoaded]);

    useEffect(() => {
        if (viewer && !viewerConfigured) {
            viewer.setEDLEnabled(false);
            viewer.setFOV(60);
            viewer.setPointBudget(1 * 1000 * 1000);
            viewer.loadSettingsFromURL();

            viewer.loadGUI(() => {
                viewer.setLanguage('en');
                $("#menu_appearance").next().show();
                viewer.toggleSidebar();
            });

            viewer.addEventListener("update", () => {
                // const direction = viewer.scene.view.direction.clone();
                // direction.z = 0;
                // direction.normalize();
                // const p1 = camera.getWorldPosition(new Vector3());
                // const p2 = p1.clone().add(direction);
                // const projection = viewer.getProjection();
                // const azimuth = Utils.computeAzimuth(p1, p2, projection);
                // const pos = Utils.computeAzimuth(p2, p1, projection);

                const camera = viewer.scene.getActiveCamera();
                const axis = document.getElementById("axis-viewer");
                if (axis) {
                    axis.style.transform = `rotateX(${(camera.rotation.x)}rad) rotateY(${(camera.rotation.y)}rad) rotateZ(${camera.rotation.z}rad)`;
                }
            });

            setViewerConfigured(true);
        }
    }, [viewer, viewerConfigured]);

    useEffect(() => {
        if (cloudFolderName && Potree && viewerConfigured && viewer) {
            Potree.loadPointCloud(cloudFolderName).then(e => {
                viewer.scene.addPointCloud(e.pointcloud);
                const { material } = e.pointcloud;
                material.size = 1;
                material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    
                e.pointcloud.position.x += 3;
                e.pointcloud.position.y -= 3;
                e.pointcloud.position.z += 4;
                viewer.fitToScreen();
            }, error => console.err(`ERROR: ${error}`));
        }
    }, [cloudFolderName, Potree, viewerConfigured, viewer]);

    return(
        <Wrapper id="potree-root">
            <AxisWrapper id="axis-viewer">
                <AxisImg src={srcAxis} alt="Axis viewer" />
            </AxisWrapper>
            <div ref={potree_render_area} id="potree_render_area" />
            <div id="potree_sidebar_container" />
        </Wrapper>
    );
}

export default Viewer;