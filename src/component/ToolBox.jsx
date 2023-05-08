import React, { useEffect, useState, useSyncExternalStore } from 'react'
import styles from '../styles/toolBox.module.css'

export default function ToolBox({ obj, optionValue }) {
  const [value, setValue] = useState(0)
  const [optionData, setOptionData] = useState(null)
  //console.log('massage box rendered')
  useEffect(() => {
    const newData = { ...optionData, ...obj?.material }
    setOptionData(newData)
  }, [obj])
  useEffect(() => {
    console.log('optiondata changes', optionData)
    optionValue(optionData)
  }, [optionData])

  function sliderChange(event) {
    const { name, value } = event.target

    const newData = { ...optionData, [name]: value }
    setOptionData(newData)
  }
  return (
    <>
      {optionData?.name != null ? (
        <div className={styles.container}>
          {'Adjust the shine of each object : '}
          {obj?.name}
          <input
            name="metalness"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={optionData?.metalness}
            onChange={sliderChange}
          />
          <input
            name="roughness"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={optionData?.roughness}
            onChange={sliderChange}
          />
          {/* <input
            name="color"
            type="color"
            id="color-picker"
            // value={color}
            onChange={sliderChange}
          /> */}
        </div>
      ) : null}
    </>
  )
}
