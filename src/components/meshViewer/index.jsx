import { useLoader } from "@react-three/fiber";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { Suspense } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const App = (props) => {
	// const Model = () => {
	// 	const ply = useLoader(PLYLoader, "./models/64.ply");
	// 	return (
	// 	  <>
	// 		<primitive object={ply.scene} scale={6.4} />
	// 	  </>
	// 	);
	// };

	
	const Scene = () => {
		// const materials = useLoader(MTLLoader, "Poimandres.mtl");
		// const obj = useLoader(OBJLoader, "./models/mesh_nc.obj", (loader) => {
		// 	// materials.preload();
		// 	// loader.setMaterials(materials);
		// });
		let mesh;

		const loader = new PLYLoader()
		loader.load(
			'models/64.ply',
			function (geometry) {
				geometry.computeVertexNormals()
				mesh = new THREE.Mesh(geometry)
				// mesh.rotateX(-Math.PI / 2)
				// scene.add(mesh)
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
			},
			(error) => {
				console.log(error)
			}
		)

		console.log(mesh);
		return <primitive object={mesh} scale={0.4} />;
	};


	return (
		<div id="canvas-container">
		  	<Canvas>
				<Suspense fallback={null}>
				<Scene />
				<OrbitControls />
				<Environment preset="sunset" background />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default App;