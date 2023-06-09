/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from 'three';
import { Vector3 } from 'three';
import JoystickController from 'joystick-controller';
// import './DeviceOrientationControls'
// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js'

// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
// const Joys = new JoystickController({}, (data) => {
//   console.log(data)
// })

export default function FirstPersonCamera() {
	const cameraRef = useRef();
	const { camera } = useThree();
	const [keysDown, setKeysDown] = useState({});
	const [currentPosition, setCurrentPosition] = useState(0, 0, 0);
	useEffect(() => {
		camera.fov = 75;
		camera.castShadow = true;
		// camera.type = 'OrthographicCamera'
		console.log(camera);
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, [onKeyDown, onKeyUp]);
	function onKeyDown(event) {
		console.log(event.code);
		setKeysDown((keysDown) => ({ ...keysDown, [event.code]: true }));
	}

	function onKeyUp(event) {
		setKeysDown((keysDown) => ({ ...keysDown, [event.code]: false }));
	}
	useFrame((state, delta) => {
		MoveCamera(state, delta);
	});

	function MoveCamera(state, delta) {
		setCurrentPosition(camera.position);
		// Move camera forward in the direction it's facing
		if (keysDown['ArrowUp']) {
			const speed = 1; // adjust the speed as needed
			const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
			camera.position.add(forward.multiplyScalar(delta * speed)).setY(0);
		}
		if (keysDown['ArrowDown']) {
			const speed = 1; // adjust the speed as needed
			const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
			camera.position.sub(forward.multiplyScalar(delta * speed)).setY(0);
		}
		if (keysDown['ArrowLeft']) {
			const speed = 1; // adjust the speed as needed
			const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
			camera.position.sub(right.multiplyScalar(delta * speed)).setY(0);
		}
		if (keysDown['ArrowRight']) {
			const speed = 1; // adjust the speed as needed
			const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
			camera.position.add(right.multiplyScalar(delta * speed)).setY(0);
		}
	}

	return (
		<>
			<mesh position={[currentPosition]}>
				<boxBufferGeometry attach='geometry' args={[(1, 1, 1)]} />
				<meshStandardMaterial attach='material' color='#4443f3' />
			</mesh>
		</>
	);
}
