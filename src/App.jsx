import React, { useState } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Box from './component/Box'
import styles from './styles/canvas.module.css'
import CameraControls from './component/CameraControls'
import Ground from './component/Ground'
import Background from './component/background'
import { Environment, PointerLockControls } from '@react-three/drei'
import FirstPersonCamera from './component/FirstPersonCamera'
import bg_360 from './assets/images/bg_360.jpg'
import * as THREE from 'three'
import Joystick from './component/Joystick'
import Model from './component/ObjLoader'
import Loader from './component/Loader'

function App() {
  const loard_buddha = {
    position: [0, -1, 0],
    path: './3Dmodels/buddha.gltf',
    scale: 2,
  }
  const texture = new THREE.TextureLoader().load(bg_360)
  return (
    <div className="App">
      <Joystick />
      <Canvas className={styles.canvas}>
        <Box randomBoxes={{ boxCount: 1, isRandomBox: true }} />
        <Ground />
        {/* <Environment files={bg_360} background blur={0} /> */}

        <PointerLockControls />
        <FirstPersonCamera />
        {/* <Model /> */}
        <Loader name={loard_buddha} />
      </Canvas>
    </div>
  )
}

export default App
