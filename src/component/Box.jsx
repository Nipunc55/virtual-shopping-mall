import React, { useState, useEffect } from 'react'

export default function Box(props) {
  const [randomBoxes, setRandomBoxes] = useState(null)
  useEffect(() => {
    console.log('useEffect')
    if (props.randomBoxes != null) {
      console.log(props.randomBoxes)
      const { boxCount, isRandomBox } = props.randomBoxes
      if (isRandomBox) {
        setRandomBoxes(RandomBoxGenarator(boxCount))
      }
    }
  }, [props.randomBoxes])
  useEffect(() => {
    console.log(randomBoxes)
  }, [randomBoxes])

  function RandomBoxGenarator(count) {
    const objects = Array(count) // Create a new array with 10 elements
      .fill() // Fill the array with undefined values
      .map((_, index) => ({
        // Iterate over each element in the array, using the index
        position: [
          // Create a new object with a `position` property
          Math.random() * 10 - 5, // Generate a random number between -5 and 5 for the x position
          Math.random() * 10 - 5, // Generate a random number between -5 and 5 for the y position
          Math.random() * 10 - 5, // Generate a random number between -5 and 5 for the z position
        ],
        size: [
          // Add a `size` property to the object with random x, y, and z values between 0 and 2
          Math.random() * 5, // Generate a random number between 0 and 2 for the x size
          Math.random() * 5, // Generate a random number between 0 and 2 for the y size
          Math.random() * 5, // Generate a random number between 0 and 2 for the z size
        ],
      }))
    return objects
  }
  return (
    <>
      {
        randomBoxes != null ? (
          <>
            {randomBoxes.map((item, index) => {
              return (
                <mesh key={index} position={item.position}>
                  <boxBufferGeometry attach="geometry" args={item.sizes} />
                  <meshStandardMaterial attach="material" color="#4443f3" />
                </mesh>
              )
            })}
          </>
        ) : null
        // <mesh>
        //   <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        //   <meshStandardMaterial attach="material" color="#f3f3f3" />
        // </mesh>
      }

      <pointLight position={[5, 10, 10]} />
    </>
  )
}
