import React, { useState, useEffect, useMemo } from 'react'
import './info.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Col, Button, Row, Form } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component"
import { withRouter } from 'react-router'

import { getAddress } from '../../lib/api'
import ChangInfo from './ChangeInfo'

const Infomation = (props) => {
  const { user, addressId, star, history } = props

  const [show, setShow] = useState(false)
  const [address, setAddress] = useState({})
  const [editingField, setEditingField] = useState('')

  useEffect(() => {
    if (addressId !== '') {
      const data = { addressId }
      getAddress(data).then((res) => {
        setAddress(res.data.address.pop())
      })
    }
  }, [addressId])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitEdit = (e, key) => {
    const ele = document.getElementById(`info-${key}`)
    const newData = ele.value
    console.log(newData);

    setEditingField('')
  }

  const editClick = (key) => {
    const ele = document.getElementById(`info-${key}`)
    ele.value = ele.placeholder
    setEditingField(key)
  }

  const renderButtons = (key) => {
    return (
      editingField === key
        ? <Button className='btn-img' onClick={(e) => submitEdit(e, key)}><img alt='' src='/img/save.PNG' /> </Button>
        : <Button className='btn-img' onClick={() => editClick(key)}><img alt='' src='/img/butchi.PNG' /> </Button>
    )
  }

  return (
    <div className='infomation'>
      <div className='info-header py-3 ml-4'>User's Information</div>
      <div className='info-body'>
        <div className='body'>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Full Name</Form.Label>
              <Col lg={6}>
                <Form.Control id='info-fullName' className='bd' type="text" placeholder={(user.firstName !== undefined) ? (user.firstName + ' ' + user.lastName) : ('Loading...')} disabled={editingField === 'fullName' ? false : true} />
              </Col>
              {renderButtons('fullName')}
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Phone Number</Form.Label>
              <Col lg={6}>
                <Form.Control id='info-phone' className='bd' type="text" placeholder={(address.mobileNumber === undefined) ? ('Loading...') : (address.mobileNumber)} disabled={editingField === 'phone' ? false : true} />
              </Col>
              {renderButtons('phone')}
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Address</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" placeholder={(address.detail === undefined) ? ('Loading...') : (address.detail + ', ' + address.city)} disabled />
              </Col>

            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Email</Form.Label>
              <Col lg={6}>
                <Form.Control id='info-email' className='bd' type="text" placeholder={(user.email === undefined) ? ('Loading...') : (user.email)} disabled={editingField === 'email' ? false : true} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>User Name</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" placeholder={(user.firstName !== undefined) ? (user.username) : ('Loading...')} disabled />
              </Col>

            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column className='text-right' lg={3}>Rating</Form.Label>
              <Col lg={6}>
                <ReactStars
                  key={Math.random()}
                  count={5}
                  value={star}
                  size={24}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                  edit={false}
                />
              </Col>
            </Form.Group>
          </Form>

          <div className='click ml-60pt py-4'>
            <Button variant="secondary" onClick={() => history.push('')}>Trở lại</Button>
            <Button className='btn-grown' onClick={() => handleShow()}>Thay đổi mật khẩu</Button>
          </div>

          <ChangInfo show={show} handleClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Infomation)