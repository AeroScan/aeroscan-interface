import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Wrapper } from './style';
import $ from 'jquery';

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
            <div ref={potree_render_area} id="potree_render_area" />
            <div id="potree_sidebar_container" />
        </Wrapper>
    );
}

export default Viewer;