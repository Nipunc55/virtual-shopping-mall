import React, { useState, useEffect, useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { OrbitControls, useTexture } from '@react-three/drei'

const Loader = (props) => {
  const [center, setCenter] = useState([0, 0, 0])
  const [clickedObject, setClickedObject] = useState(null)
  const mesh = useRef()
  const orbitRef = useRef()
  const { camera } = useThree()
  const gltf = useLoader(GLTFLoader, props.name.path)
  const raycaster = new THREE.Raycaster()
  //console.log('loader rendered')
  useEffect(() => {
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
  }, [])
  useEffect(() => {
    const { metalness, roughness } = props.option
    if (clickedObject) {
      clickedObject.material.metalness = metalness
      clickedObject.material.roughness = roughness
    }

    // console.log(center)
  }, [props.option])

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
    const { clientX, clientY } = event
    const x = (clientX / window.innerWidth) * 2 - 1
    const y = -(clientY / window.innerHeight) * 2 + 1
    const mouse = { x: x, y: y }
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(mesh.current.children, true)
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object
      if (clickedObject) {
        const { name, position } = clickedObject
        props.onDataReceve(clickedObject)
        setClickedObject(clickedObject)
        //clickedObject.material.metalness = 1
        //console.log(clickedObject)
        const worldPosition = new THREE.Vector3().copy(clickedObject.position)
        clickedObject.parent.localToWorld(worldPosition)
        setCenter(worldPosition)
      }
    }
  }

  // Get the bounding box of the loaded model
  // try {
  //   // const box = new THREE.Box3()

  //   if (gltf.scene) {
  //     // box.setFromObject(gltf.scene)
  //     // console.log('box center', box.getCenter())
  //   } else {
  //     // Handle the case where gltf.scene is null or undefined
  //     console.error('Error: GLTF scene is null or undefined')
  //     // return null
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
  // gltf.scene.traverse((child) => {
  //   if (child.isMesh) {
  //     // Apply materials to the mesh
  //     child.material = new THREE.MeshStandardMaterial({
  //       color: 0xffffff, // Set the color to white
  //       map: child.material.map, // Use the existing texture map
  //       metalnessMap: child.material.map, // Use the existing texture map as the metalness map
  //       metalness: 0.6, // Increase the metalness to 1
  //       roughness: 0.5,
  //     })
  //   }
  // })
  //*********/
  useFrame((state, delta) => {
    orbitRef.current.update()
    // mixer?.update(delta)
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
      <pointLight position={[0, 4, 0]} color="#C9FF7C" intensity={0.6} />
      <pointLight position={[0, 1, 0]} color="#001BFF" intensity={0.6} />
      <ambientLight intensity={0.2} />
      <directionalLight color="#ffffff" intensity={0.5} position={[0, 1, 0]} />
      <OrbitControls ref={orbitRef} target={center} />
      <primitive
        ref={mesh}
        object={gltf.scene}
        scale={props.name.scale}
        position={props.name.position}
        onClick={handleClick}
      />
    </>
  )
}
export default Loader
