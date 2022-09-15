import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Axes, Wrapper } from './style';
import $ from 'jquery';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Viewer = () => {
    const { Potree } = window;

    const [ viewer, setViewer ] = useState(null);
    const [ viewerConfigured, setViewerConfigured ] = useState(false);

    const potree_render_area = useRef(null);
    const { cloudFolderName } = useContext(GlobalContext);

    const potreeAxes = useRef(null);

    useEffect(() => {
        if (Potree) {
            const viewerElem = potree_render_area.current
            setViewer(new Potree.Viewer(viewerElem));
        }
    }, [Potree]);

    useEffect(() => {
        if (viewer && !viewerConfigured) {
            viewer.setEDLEnabled(false);
            viewer.setFOV(60);
            viewer.setPointBudget(1*1000*1000);
            viewer.loadSettingsFromURL();

            viewer.loadGUI(() => {
                viewer.setLanguage('en');
                $("#menu_filters").next().show();
                viewer.toggleSidebar();
                viewer.setClassifications([
                    {
                        visible: true,
                        name: 'plane',
                        color: [1, 0, 0, 1],
                    },
                    {
                        visible: true,
                        name: 'cylinder',
                        color: [0, 0, 1, 1],
                    },{
                        visible: true,
                        name: 'sphere',
                        color: [0, 1, 0, 1],
                    },{
                        visible: true,
                        name: 'cone',
                        color: [0, 1, 1, 1],
                    },
                ]);
            });

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 10000000 );
            const renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setClearColor( 0x000000, 0 );
            potreeAxes.current.appendChild( renderer.domElement );
            
            const controls = new OrbitControls( camera, renderer.domElement );
            scene.add( new THREE.AxesHelper( 10000 ) )        
            const animate = () => {
                requestAnimationFrame( animate );
                controls.update();
                renderer.render( scene, camera );
            }
            animate();

            const handleAxes = () => {
                const coordinate = viewer.scene.getActiveCamera().position
                camera.position.set(Math.round(coordinate.x), Math.round(coordinate.y), Math.round(coordinate.z));
                scene.add(camera)
            }

            viewer.addEventListener("update", handleAxes);

            setViewerConfigured(true);
        }
    }, [viewer, viewerConfigured]);

    useEffect(() => {
        if (Potree && viewerConfigured && viewer) {
            Potree.loadPointCloud(`clouds/${cloudFolderName}/metadata.json`).then(e => {
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
            <Axes ref={potreeAxes} />
            <div ref={potree_render_area} id="potree_render_area" data-tut="eighth-step"/>
            <div id="potree_sidebar_container" data-tut="ninth-step"/>
        </Wrapper>
    );
}

export default Viewer;
