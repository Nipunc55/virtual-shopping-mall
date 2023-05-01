import React, { useState } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

const Loader = (props) => {
  const gltf = useLoader(GLTFLoader, props.name.path)

  let mixer
  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[0])
    action.play()
    // action.halt(8)
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip)
      console.log(clip)
      // action.play()

      // action.halt(props.aniamtionDuration)
    })
  }
  //*********/
  useFrame((state, delta) => {
    mixer?.update(delta)
  })

  return (
    <>
      <primitive
        object={gltf.scene}
        scale={props.name.scale}
        position={props.name.position}
      />
    </>
  )
}
export default Loader
