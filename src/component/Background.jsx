import React, { Suspense } from 'react'
import { Environment } from '@react-three/drei'

export default function Background() {
  return (
    <>
      <Environment
        files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
        background
        blur={0}
      />
      <ambientLight />
    </>
  )
}
