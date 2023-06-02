import React from 'react'

import styles from '../styles/loadingBar.module.css'
export default function Loading() {
  return (
    <div className={styles.loadingScreen}>
      <div>Loading.......... </div>
     <div className={styles.loadingSpinner}></div>
     </div>
  )
}
