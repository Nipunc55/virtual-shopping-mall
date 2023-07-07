/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';
import texture1 from '../assets/images/texture2.png';

const Loader = (props) => {
	const texture = useLoader(THREE.TextureLoader, texture1);
	const [pointLightPos, setPointLightPos] = useState([4, 0, 4]);
	const [center, setCenter] = useState([0, 0, 0]);
	const [clickedObject, setClickedObject] = useState(null);
	const mesh = useRef();
	const orbitRef = useRef();
	const { camera } = useThree();
	const gltf = useLoader(GLTFLoader, props.name.path);
	const raycaster = new THREE.Raycaster();
	const texture_material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true,
	});

	function getWorldPosition(child) {
		const worldPosition = new THREE.Vector3().copy(child.position);
		child.parent.localToWorld(worldPosition);
		return worldPosition;
	}

	useEffect(() => {
		console.log(
			getWorldPosition(
				gltf.scene.children.filter((child) => {
					return child.name === 'Point';
				})[0]
			)
		);

		if (gltf.scene.children.length > 0) {
			gltf.scene.children.forEach((child) => {
				if (child.name === 'dream-catcher') {
					const worldPosition = new THREE.Vector3().copy(child.position);
					child.parent.localToWorld(worldPosition);
					//setCenter(worldPosition);
				}
			});
		}
		PlayAnimation();
	}, [gltf]);
	useEffect(() => {
		const { metalness, roughness } = props.option;
		if (clickedObject) {
			clickedObject.material.metalness = metalness;
			clickedObject.material.roughness = roughness;
		}

		// console.log(center)
	}, [props.option]);
	useEffect(() => {
		if (clickedObject) {
			const regex = /^frame(\d+)?$/;
			texture_material.map.rotation = 0;

			if (regex.test(clickedObject.name))
				clickedObject.material = texture_material;
		}

		//console.log(clickedObject);
	}, [clickedObject]);

	function PlayAnimation() {
		console.log(gltf.scene.children);
		// if (gltf.scene.children.length > 0) {
		// 	gltf.scene.children.forEach((child) => {
		// 		if (child.animations.length > 0) {
		// 			mixer = new THREE.AnimationMixer(child);
		// 			const action = mixer.clipAction(child.animations[0]);
		// 			action.play();
		// 			// action.halt(8)
		// 			child.animations.forEach((clip) => {
		// 				const action = mixer.clipAction(clip);
		// 				console.log(clip);
		// 				action.play();

		// 				// action.halt(props.aniamtionDuration)
		// 			});
		// 		}
		// 	});
		// }

		if (gltf.scene) {
			mesh.current = new THREE.AnimationMixer(gltf.scene);
			const action = mesh.current.clipAction(gltf.animations[0]);
			action.play();
			// action.halt(8)
			gltf.animations.forEach((clip) => {
				const action = mesh.current.clipAction(clip);
				console.log(clip);
				action.play();

				// action.halt(props.aniamtionDuration)
			});
		}
	}
	/**
	 * get the center of clicked object
	 * @param {*} event
	 */
	const handleClick = (event) => {
		// // Calculate the center position of the clicked mesh
		// const box = new THREE.Box3().setFromObject(mesh.current)
		// const center = box.getCenter(new THREE.Vector3())

		// // Set the center position state
		// setCenter([center.x, center.y, center.z])
		const { clientX, clientY } = event;
		const x = (clientX / window.innerWidth) * 2 - 1;
		const y = -(clientY / window.innerHeight) * 2 + 1;
		const mouse = { x: x, y: y };
		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(mesh.current.children, true);
		if (intersects.length > 0) {
			const clickedObject = intersects[0].object;
			if (clickedObject) {
				const { name, position } = clickedObject;
				props.onDataReceve(clickedObject);
				setClickedObject(clickedObject);
				//clickedObject.material.metalness = 1
				console.log(name);
				const worldPosition = new THREE.Vector3().copy(clickedObject.position);
				clickedObject.parent.localToWorld(worldPosition);
				if (name == 'dream-catcher') setCenter(worldPosition);
			}
		}
	};

	//*********/
	useFrame((state, delta) => {
		orbitRef.current.update();
		if (mesh.current) {
			mesh.current.update(delta);
		}
	});

	return (
		<>
			<pointLight position={pointLightPos} color='#001BFF' intensity={0.6} />
			{/* <pointLight position={[pointLightPos]} color='#001BFF' intensity={0.6} /> */}
			{/* <ambientLight intensity={0.2} /> */}
			<directionalLight color='#ffffff' intensity={0.5} position={[0, 1, 0]} />
			<OrbitControls
				maxPolarAngle={Math.PI / 2} // Limit rotation to 90 degrees (pi/2) on the X-axis
				minPolarAngle={Math.PI / 3} // Optionally, you can set a minimum polar angle
				ref={orbitRef}
				target={center}
			/>
			<primitive
				ref={mesh}
				object={gltf.scene}
				scale={props.name.scale}
				position={props.name.position}
				onClick={handleClick}
			/>
		</>
	);
};
export default Loader;
