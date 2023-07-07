import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import { Box } from '@react-three/drei';

const XRScene = () => {
  const cubeRef = useRef();

  // Rotate the cube in the animation loop
  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <XR>
        <Box ref={cubeRef} position={[0, 0, -5]} />
      </XR>
    </>
  );
};

export default XRScene;
