import React from 'react'
import styles from '../styles/joystick.module.css'
import { Button, Navbar, Container, Row, Col } from 'react-bootstrap'

export default function Joystick() {
  return (
    <>
      <div className={styles.container}>
        <Row>
          <Col className="d-flex bg-success h-100"></Col>
          <Col className="bg-warning">afa</Col>
        </Row>
      </div>
    </>
  )
}
