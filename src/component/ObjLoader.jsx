import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-obj-loader'

const objPath = '/3Dmodels/Buddha.obj'
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }) // Specify a material for the model

export default function Model() {
  const obj = useLoader(OBJLoader, objPath)

  return (
    <mesh>
      <primitive object={obj} material={material} />
    </mesh>
  )
}
