import React, { useState, useEffect } from 'react'
import './info.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Col, Button, Row, Form } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component"
import { withRouter } from 'react-router'

import { getAddress } from '../../lib/api'

const Infomation = (props) => {
  const { user, addressId, star, history } = props

  const [address, setAddress] = useState({})

  useEffect(() => {
    if (addressId !== '') {
      const data = { addressId }
      getAddress(data).then((res) => {
        setAddress(res.data.address[0])
      })
    }
  }, [addressId])

  return (
    <div className='infomation'>
      <div className='info-header py-3 ml-4'>User's Information</div>
      <div className='info-body'>
        <div className='body'>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Full Name</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" value={(user.firstName !== undefined) ? (user.firstName + ' ' + user.lastName) : ('Loading...')} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Phone Number</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" value={(address.mobileNumber === undefined) ? ('Loading...') : (address.mobileNumber)} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Address</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" value={(address.detail === undefined) ? ('Loading...') : (address.detail + ', ' + address.district + ', ' + address.city)} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Address Type</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" value={(address.addressType === undefined) ? ('Loading...') : (address.addressType)} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>User Name</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" value={(user.firstName !== undefined) ? (user.username) : ('Loading...')} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column className='text-right' lg={3}>Rating</Form.Label>
              <Col lg={6}>

                <ReactStars
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

          <div className='click ml-70pt py-4'>
            <Button variant="secondary" onClick={() => history.push('')}>Trở lại</Button>
            {/* <Button className='btn-grown' type='submit'>Lưu thay đổi</Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Infomation)