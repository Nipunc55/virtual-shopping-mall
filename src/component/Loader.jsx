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

  // Get the bounding box of the loaded model
  try {
    // const box = new THREE.Box3()

    if (gltf.scene) {
      // box.setFromObject(gltf.scene)
      // console.log('box center', box.getCenter())
    } else {
      // Handle the case where gltf.scene is null or undefined
      console.error('Error: GLTF scene is null or undefined')
      // return null
    }
  } catch (error) {
    console.log(error)
  }

  //*********/
  useFrame((state, delta) => {
    mixer?.update(delta)
    // console.log(state.camera.position.distanceTo(box.getCenter()))
    // Check for collisions with other objects in the scene
    // For example, if you have a cube mesh named "cubeMesh" in the scene:
    // if (
    //   state.camera.position.distanceTo(box.getCenter()) <
    //     box.getSize().length() / 2 + 1 &&
    //   cubeMesh.visible
    // ) {
    //   console.log('collision detected!')
    //   // Do something when a collision is detected, such as resetting the scene or playing an animation
    // }
  })

  return (
    <>
      <pointLight position={[0, 4, 0]} color="#ffffff" intensity={0.5} />
      <ambientLight intensity={0.2} />
      <directionalLight color="#ffffff" intensity={0.5} position={[0, 1, 0]} />
      <primitive
        object={gltf.scene}
        scale={props.name.scale}
        position={props.name.position}
      />
    </>
  )
}
export default Loader
