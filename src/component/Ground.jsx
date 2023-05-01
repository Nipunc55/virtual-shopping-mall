import React from 'react'
import { Canvas } from '@react-three/fiber'

export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeBufferGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.3} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
