import React, { useState } from 'react'
import './index.scss'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import { loginAd } from '../../../lib/api'

const LoginAdmin = ({ history }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  //fuction
  const getName = (e) => {
    setName(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = { name, password }
    loginAd(data).then((res) => {
      localStorage.setItem('tokenAd', res.data.token)
      history.push('admin/manage')
    })
      .catch((err) => {
        window.alert('Sai mat khau hoac tai khoan')
      })
  }

  return (
    <Container className='loginAdmin' onSubmit={onSubmit}>
      <h1 className='fs-30'>LOGIN FORM</h1>
      <Form className='form'>
        <Form.Group as={Row}>
          <Form.Label column sm={4}>User name</Form.Label>
          <Col sm={7}>
            <Form.Control type="text" placeholder="User name" required onChange={getName} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={4}>Password</Form.Label>
          <Col sm={7}>
            <Form.Control type="password" placeholder="Password" required onChange={getPassword} />
          </Col>
        </Form.Group>
        {/* <Button variant='dark' type='button' onClick={()=> history.push('register')}>REGISTER</Button> */}
        <Button variant='dark' type='submit'>LOGIN</Button>
      </Form>
    </Container>
  )
}
export default LoginAdmin