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

  useEffect(() => {
    const { metalness, roughness } = props.option
    if (clickedObject) {
      clickedObject.material.metalness = metalness
      clickedObject.material.roughness = roughness
    }

    // console.log(center)
  }, [props.option])
  useEffect(() => {
   if(clickedObject)PlayAnimation()
  }, [clickedObject])
  
function PlayAnimation(){
 if (clickedObject.animations.length) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
      // action.halt(8)
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip)
        console.log(clip)
         action.play()

        // action.halt(props.aniamtionDuration)
      })
    }
}
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


  //*********/
  useFrame((state, delta) => {
    orbitRef.current.update()
   
  })

  return (
    <>
      <pointLight position={[0, 4, 0]} color="#C9FF7C" intensity={0.6} />
      <pointLight position={[0, 1, 0]} color="#001BFF" intensity={0.8} />
      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight color="#ffffff" intensity={0.5} position={[0, 1, 0]} />
      <OrbitControls
       maxPolarAngle={Math.PI / 2} // Limit rotation to 90 degrees (pi/2) on the X-axis
        minPolarAngle={Math.PI / 3} // Optionally, you can set a minimum polar angle
         ref={orbitRef} target={center} />
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
