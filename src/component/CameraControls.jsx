import React, { useRef } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export default function CameraControls() {
  const { camera, gl } = useThree()
  const controlsRef = useRef()

  useFrame(() => controlsRef.current.update())

  return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />
}
