import React, { useState } from 'react'
import './rating.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Col, Button, Row, Form, Modal } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component"

import { rateUser } from '../../lib/api'

const Rating = (props) => {
  const { show, handleClose, orderId } = props

  const [star, setStar] = useState(1)

  const ratingChanged = (newRating) => {
    setStar(newRating)
  }

  const onsubmit = (e) => {
    e.preventDefault()

    const data = {star, orderId}  
    rateUser(data)
    window.alert("Đánh giá đơn hàng thành công! Cảm ơn bạn!")
    // handleClose()
    window.location.reload()
  }

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đánh giá đơn hàng của bạn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='rating py-1'>
          <Form className='body my-2 pt-3 ml-3' onSubmit={onsubmit}>
            <Row>
              <Col sm={1}/>
              <Col sm={12}>
                <Form.Group as={Row} >
                  <Form.Label column className='text-right' lg={3}>Rating</Form.Label>
                  <Col lg={6}>
                    <ReactStars
                      count={5}
                      value={1}
                      onChange={ratingChanged}
                      size={24}
                      emptyIcon={<i className="far fa-star"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <div className='click ml-60pt pb-3'>
              <Button variant="secondary" onClick={handleClose}>Trở lại</Button>
              <Button className='btn-grown' type='submit'>Đánh giá</Button>
            </div>
          </Form>

        </div>
      </Modal.Body>
    </Modal>
  )
}
export default Rating