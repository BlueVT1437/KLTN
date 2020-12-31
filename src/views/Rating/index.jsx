import React from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Col, Button, Row, Form } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component"

import Header from '../../components/Header'

const Rating = () => {

  const ratingChanged = (newRating) => {
    console.log(newRating);
  }

  return (
    <div className='rating pb-3'>
      <Header />
      <Form className='body my-3 pt-3 ml-3'>
        <Row>
          <Col sm={3}>
            <div className='left ml-5'>
              <img alt='avatar' src='/img/noavatar.png' />
              <h1 className='fs-20 my-4 mx-5'>
                Username Infomation
              </h1>
            </div>
          </Col>

          <Col sm={8}>
            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Full Name</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Phone Number</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Address</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Email</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Comment</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' type="text" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column className='text-right' lg={3}>Rating</Form.Label>
              <Col lg={6}>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  // value={3}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column className='text-right' lg={3}>Your comment</Form.Label>
              <Col lg={6}>
                <Form.Control className='bd' as='textarea'></Form.Control>
              </Col>
            </Form.Group>

          </Col>
        </Row>
        <div className='click ml-60pt pb-3'>
          <Button variant="secondary">Trở lại</Button>
          <Button className='btn-grown' type='submit'>Bình luận</Button>
        </div>
      </Form>

    </div>
  )
}
export default Rating