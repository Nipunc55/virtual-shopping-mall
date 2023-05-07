import React, { useEffect, useState } from 'react'
import styles from '../styles/massageBox.module.css'

export default function MassageBox({ obj, massage, optionValue }) {
  const [value, setValue] = useState(0)
  //console.log('massage box rendered')
  useEffect(() => {
    //console.log(obj?.material?.metalness)
    if (obj) setValue(obj?.material?.metalness * 100)

    // props?.obj?.material?.metalness += 1
  }, [obj])
  function sliderChange(event) {
    setValue(event.target.value)
    optionValue(event.target.value / 100)
  }
  return (
    <>
      {obj != null ? (
        <div className={styles.container}>
          {'Adjust the shine of each object : '}
          {obj?.name}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={sliderChange}
          />
        </div>
      ) : null}
    </>
  )
}
