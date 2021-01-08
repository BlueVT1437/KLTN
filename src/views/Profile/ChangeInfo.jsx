import React, { useState } from 'react'
import './rating.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Col, Button, Row, Form, Modal } from 'react-bootstrap'

import { updateUser } from '../../lib/api'

const ChangInfo = (props) => {
  const { show, handleClose } = props

  const userId = localStorage.getItem('userId')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const getFirst = (e) => setFirstName(e.target.value)
  const getLast = (e) => setLastName(e.target.value)
  const getPhone = (e) => setPhone(e.target.value)

  const onsubmit = (e) => {
    e.preventDefault()
    const data = {
      userId,
      firstName,
      lastName,
      phone
    }
    window.alert("Thông tin đã thay đổi thành công!")
  }

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thay đổi thông tin người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='rating py-1'>
          <Form className='body my-2 pt-3 ml-3' onSubmit={onsubmit}>
            <Row>
              <Col sm={1} />
              <Col sm={11}>
                <Form.Group as={Row} >
                  <Form.Label column className='text-right' lg={4}>Mật khẩu cũ</Form.Label>
                  <Col lg={6}>
                    <Form.Control className='bd' type='password'></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} >
                  <Form.Label column className='text-right' lg={4}>Mật khẩu mới</Form.Label>
                  <Col lg={6}>
                    <Form.Control className='bd' type='password'></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} >
                  <Form.Label column className='text-right' lg={4}>Nhập lại mật khẩu mới</Form.Label>
                  <Col lg={6}>
                    <Form.Control className='bd' type='password'></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <div className='click ml-70pt pb-3'>
              <Button variant="secondary" onClick={handleClose}>Trở lại</Button>
              <Button className='btn-grown' type='submit'>Lưu</Button>
            </div>
          </Form>

        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ChangInfo