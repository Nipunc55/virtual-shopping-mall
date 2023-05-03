import React, { useState } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Box from './component/Box'
import styles from './styles/canvas.module.css'

import Ground from './component/Ground'
import {
  Environment,
  PointerLockControls,
  OrbitControls,
} from '@react-three/drei'
import FirstPersonCamera from './component/FirstPersonCamera'

import * as THREE from 'three'
import Joystick from './component/Joystick'
import Model from './component/ObjLoader'
import Loader from './component/Loader'

function App() {
  const loard_buddha = {
    position: [-5, -1, -5],
    path: './3Dmodels/buddha.gltf',
    scale: 2,
  }
  const castle = {
    position: [5, -10, 0],
    path: './3Dmodels/castle.gltf',
    scale: 1,
  }
  const kitchen = {
    position: [0, -2, 3],
    path: './3Dmodels/Kitchen.gltf',
    scale: 1,
  }
  return (
    <div className="App">
      <Joystick />
      <Canvas className={styles.canvas}>
        {/* <Box randomBoxes={{ boxCount: 1, isRandomBox: true }} /> */}
        {/* <Ground /> */}
        {/* <Environment
          files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
          background
          blur={0}
        /> */}
        <OrbitControls />
        {/* <PointerLockControls /> */}
        <FirstPersonCamera />
        {/* <Model /> */}

        {/* <Loader name={loard_buddha} /> */}
        <Loader name={kitchen} />
      </Canvas>
    </div>
  )
}

export default App
