import React, { useState, useContext } from 'react'
import './index.scss'
import '../../assets/style/props.scss'
import { Button, Form, Row, Col } from 'react-bootstrap'

import { addressCreate } from '../../lib/api'
import { ProfileContext } from '../../contexts/profileContext'

import Paypal from '../../components/Paypal'
import Header from '../../components/Header'
import Paying from './Paying'
//Cach xai UseContext
const Bill = (props) => {
  const { match } = props
  // const { setDefaultOrder } = useContext(ProfileContext)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [alphone, setAlphone] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState(0)
  // const [order, setOrder] = useState({})

  const getPhone = (e) => setPhone(e.target.value)
  const getCode = (e) => setCode(e.target.value)
  const getAddress = (e) => setAddress(e.target.value)
  const getDistrict = (e) => setDistrict(e.target.value)
  const getCity = (e) => setCity(e.target.value)
  const getAlphone = (e) => setAlphone(e.target.value)
  const getType = (e) => setType(e.target.value)
  const user = localStorage.getItem('userId')
  const price = localStorage.getItem('buynow')
  const id = match.params.id

  const onsubmit = (e) => {
    e.preventDefault()
    const data = {
      phone,
      code,
      address,
      district,
      city,
      alphone,
      type,
      user,
      price,
      id,
      status
    }
    localStorage.setItem('buynow', '')
    addressCreate(data).then((res) => {
      console.log(res.data)
    })
    handleShow()
  }

  return (
    <>
      <Header />
      <Form className='bill' onSubmit={onsubmit}>
        <p className='fs-30 my-3'><b>INFORMATION</b></p>
        <p className='cl-brown fs-20'>* Nếu bạn thanh toán bằng Paypal vui lòng click Paypal trước!</p>
        <br />
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Phone: </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Phone number" onChange={getPhone} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Pin Code: </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Pin code" onChange={getCode} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Address:</Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Detail" onChange={getAddress} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>District: </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="District" onChange={getDistrict} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>City: </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="City" onChange={getCity} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Alternate Phone : </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Alternate phone" onChange={getAlphone} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Address Type: </Form.Label>
          <Col sm={5}>
            <Form.Control as="select" sm={3} onChange={getType}>
              <option>Chose your address type</option>
              <option value='home'>Home</option>
              <option value='work'>Work</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button className='sub my-3' variant="danger" type='submit' >SUBMIT</Button>
      </Form>
      {(status === 0 && phone === '' && code === '') ?
        (
          <Paypal getStatus={(status) => setStatus(status)} />
        ) : ('')}
      <Paying show={show} handleClose={handleClose} />
    </>
  )
}
export default Bill