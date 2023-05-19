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
import ObjectClickable from './component/ObjectClickable'
import MassageBox from './component/MassageBox'
import ToolBox from './component/ToolBox'

function App() {
  const [massage, setMassage] = useState('Adjust the shine of each object : ')
  const [obj, setObj] = useState(null)
  const [option, setOptionValue] = useState(0)

  const room = {
    position: [0, 0, 0],
    path: './3Dmodels/room_new.gltf',
    scale: 1,
  }
  const kitchen = {
    position: [0, -2, 3],
    path: './3Dmodels/Kitchen.gltf',
    scale: 1,
  }
  return (
    <div className="App">
      {/* <Joystick /> */}
      <ToolBox
        obj={obj}
        optionValue={(data) => {
          setOptionValue(data)
        }}
      />
      {/* <MassageBox massage={massage} /> */}
      <Canvas className={styles.canvas}>
        {/* <Box randomBoxes={{ boxCount: 1, isRandomBox: true }} /> */}
        {/* <Ground /> */}
        {/* <Environment
          files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
          background
          blur={0}
        /> */}
        {/* <ObjectClickable /> */}
        {/* <PointerLockControls /> */}
        <FirstPersonCamera />
        {/* <Model /> */}

        {/* <Loader name={loard_buddha} /> */}
        <Loader
          option={option}
          name={room}
          onDataReceve={(obj) => {
            setObj(obj)
          }}
        />
      </Canvas>
    </div>
  )
}

export default App
