import React, { useEffect } from 'react'
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import texture1 from '../assets/images/texture2.png'
import depthMap1 from '../assets/images/depthMap.png'

const Item = () => {
  const texture = useLoader(THREE.TextureLoader, texture1);
  const depthMap = useLoader(THREE.TextureLoader, depthMap1);


  const texture_material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
   const transparent_material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
      alphaTest: 0.1,
  
  });

const material=[
 transparent_material, transparent_material,transparent_material,transparent_material, texture_material,texture_material

]

  const geometry = new THREE.BoxGeometry(1,1,0.001); // Adjust the size as needed

 
  return (
        <>
         {/* <ambientLight /> */}
      <mesh rotation={[0, Math.PI / 2,0]} material={material} geometry={geometry}  position={[-4.5,2.6, 0.6]} scale={[1, 1, 1]}>
      {/* You can add additional components to the mesh if required */}
    </mesh>
   </>
  );
};

export default Item;



