import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { GUI } from "dat.gui";
import "antd/dist/antd.css";
import { Viewer } from "./style";
import * as dat from 'dat.gui'

const MeshViewer = () => {

	const params = {
		size: 0.1,
		rotate: true,
	};

	const size = {
		height: 600,
		width: 1400,
	};

    // scene setup
  	const scene = new THREE.Scene();
	  scene.background = new THREE.Color( 0xa0a0a0 );
	// scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );
  	// scene.add(new THREE.AxesHelper(2))

	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
	hemiLight.position.set( 0, 20, 0 );
	scene.add( hemiLight );

  	// lights
	const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
	dirLight.position.set( - 3, 10, - 10 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 2;
	dirLight.shadow.camera.bottom = - 2;
	dirLight.shadow.camera.left = - 2;
	dirLight.shadow.camera.right = 2;
	dirLight.shadow.camera.near = 0.1;
	dirLight.shadow.camera.far = 40;
	scene.add( dirLight );

	// camera setup
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 0, 0, - 6 );

	// renderer setup
	const renderer = new THREE.WebGLRenderer( { antialias: true } );

	useEffect(() => {
		const viewerContainer = document.getElementById("app");
		if(viewerContainer){
			// renderer.setClearColor(new THREE.Color(0x112233, 1.0));
			renderer.setSize(viewerContainer.offsetWidth, viewerContainer.offsetHeight);
			viewerContainer.appendChild(renderer.domElement);
		}

		// gui setup
		const panel = new dat.GUI({   autoPlace: false, width: 340 })
		panel.domElement.id = 'gui';
		viewerContainer.appendChild(panel.domElement);

		const folder1 = panel.addFolder( 'Collect Triangles' );
		folder1.add(params, 'size' ).min( 0.1 ).max( 1 ).step( 0.1 );
		folder1.add( params, 'rotate' );
		folder1.open();
		const folder2 = panel.addFolder( 'Activation/Deactivation' );
		folder2.open();
		const folder3 = panel.addFolder( 'Pausing/Stepping' );
		folder3.open();
	
			// panel.open();
			
		return () => {
			  panel.destroy();
		}
	}, []);

	const controls = new OrbitControls(camera, renderer.domElement);

	// 	const loader = new GLTFLoader();
	// loader.load( 'models/Soldier.glb', function ( gltf ) {

	// 	const model = gltf.scene;
	// 	scene.add( model );
	// 	animate();

	// }, (error) => {
	// 	console.log(error)
	// }
	// );

	const plyMaterial = new THREE.MeshPhysicalMaterial({
		color: 0xb2ffc8, 
	})
	
	const loader = new PLYLoader()
	loader.load('models/64.ply', function ( plyGeometry ) {
		var model = new THREE.Mesh ( plyGeometry, plyMaterial );
		model.rotateX(-Math.PI / 2)
		model.position.set(0, -1, 0);
		scene.add( model );
		animate();
	},
	(error) => {
		console.log(error)
	});

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}

    return(
        <Viewer className="App" id="app" />
    );
}

export default MeshViewer;
