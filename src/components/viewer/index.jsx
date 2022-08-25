import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Axes, Wrapper } from './style';
import $ from 'jquery';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Viewer = () => {
    const { Potree } = window;

    const [ pageLoaded, setPageLoaded ] = useState(false);
    const [ viewer, setViewer ] = useState(null);
    const [ viewerConfigured, setViewerConfigured ] = useState(false);

    const potree_render_area = useRef(null);
    const { cloudFolderName } = useContext(GlobalContext);

    const potreeAxes = useRef(null);

    useEffect(() => {
        if (Potree && !pageLoaded) {
            const viewerElem = potree_render_area.current
            setViewer(new Potree.Viewer(viewerElem));
            //setPageLoaded(true);
        }
    }, [Potree, pageLoaded]);    

    useEffect(() => {
        if (viewer && !viewerConfigured) {

            viewer.setEDLEnabled(false);
            viewer.setFOV(60);
            viewer.setPointBudget(1*1000*1000);
            viewer.loadSettingsFromURL();


            // ERRO
            viewer.loadGUI(() => {
                viewer.setLanguage('en');
                $("#menu_appearance").next().show();
                viewer.toggleSidebar();
            });

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 10000000 );
            camera.position.set( 15, 20, 30 );
            scene.add(camera)
            
            const renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setClearColor( 0x000000, 0 );
            potreeAxes.current.appendChild( renderer.domElement );
            
            const controls = new OrbitControls( camera, renderer.domElement );
    
            scene.add( new THREE.AxesHelper( 20 ) )        
    
            const animate = () => {
                requestAnimationFrame( animate );
                controls.update();
                renderer.render( scene, camera );
            }
    
            animate();

            // const handleViewerAxes = () => {
            //     const cameraP = viewer.scene.getActiveCamera();


            //     camera.position.set( cameraP.rotation.x, cameraP.rotation.y, cameraP.rotation.z );
            //     scene.add(camera)

            //     scene.add( new THREE.AxesHelper( 20 ) ) 

            //     animate();
                
            //     // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z)
            //     // axes.geometry.translate( cameraP.rotation.x, cameraP.rotation.y, cameraP.rotation.z )

            //     // axes.applyMatrix(new THREE.Matrix4().makeTranslation(cameraP.rotation.x, cameraP.rotation.y, cameraP.rotation.z));
            
                    
            //     // potreeAxes.style.transform = `rotateX(${(cameraP.rotation.x)}rad) rotateY(${(cameraP.rotation.y)}rad) rotateZ(${cameraP.rotation.z}rad)`;
                
            // }

            // viewer.addEventListener("update", handleViewerAxes);

            setViewerConfigured(true);
        }
    }, [viewer, viewerConfigured]);

    // useEffect(() => {
    //     if (cloudFolderName && Potree && viewerConfigured && viewer) {
    //         Potree.loadPointCloud(cloudFolderName).then(e => {
    //             viewer.scene.addPointCloud(e.pointcloud);
    //             const { material } = e.pointcloud;
    //             material.size = 1;
    //             material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
    
    //             e.pointcloud.position.x += 3;
    //             e.pointcloud.position.y -= 3;
    //             e.pointcloud.position.z += 4;
    //             viewer.fitToScreen();
    //         }, error => console.err(`ERROR: ${error}`));
    //     }
    // }, [cloudFolderName, Potree, viewerConfigured, viewer]);

    return(
        <Wrapper id="potree-root">
            <Axes ref={potreeAxes} />
            <div ref={potree_render_area} id="potree_render_area" />
            <div id="potree_sidebar_container" />
        </Wrapper>
    );
}

export default Viewer;
