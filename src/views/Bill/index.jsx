import React, { useState, useContext, useRef, useMemo } from 'react'
import './index.scss'
import '../../assets/style/props.scss'
import { Button, Form, Row, Col } from 'react-bootstrap'

import { addressCreate, email } from '../../lib/api'
import { ProfileContext } from '../../contexts/profileContext'

import Paypal from '../../components/Paypal'
import Header from '../../components/Header'
import Paying from './Paying'
import LocationSearchModal from './LocationSearch'
//Cach xai UseContext
const Bill = (props) => {
  const { match } = props
  // const { setDefaultOrder } = useContext(ProfileContext)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [alphone, setAlphone] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState(0)

  const getPhone = (e) => setPhone(e.target.value)
  const getAddress = (e) => setAddress(e.target.value)
  const getAlphone = (e) => setAlphone(e.target.value)
  const getType = (e) => setType(e.target.value)
  const user = localStorage.getItem('userId')
  const price = localStorage.getItem('buynow')
  const id = match.params.id

  const onsubmit = (e) => {
    e.preventDefault()
    const data = {
      phone,
      address,
      city,
      alphone,
      type,
      user,
      price,
      id,
      status,
    }
    addressCreate(data).then((res) => {
      console.log(res.data)
      email(res.data.order._id).then((res) => {
        console.log(res.data)
      })
      localStorage.setItem('buynow', '')
      handleShow()
    })
  }

  const locationSelector = useMemo(() => {
    return <LocationSearchModal setCity={(city) => setCity(city)} />
  }, [city])

  return (
    <>
      <Header />
      <Form className='bill' onSubmit={onsubmit}>
        <p className='fs-30 my-3'><b>INFORMATION</b></p>
        <p className='cl-brown fs-20'>* Nếu bạn thanh toán bằng Paypal vui lòng click Paypal trước!</p>
        <br />
        <div style={{ height: '15rem' }}>
          {locationSelector}
        </div>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Số nhà:</Form.Label>
          <Col sm={6}>
            <Form.Control type="text" placeholder="Detail" onChange={getAddress} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Phone: </Form.Label>
          <Col sm={6}>
            <Form.Control type="text" placeholder="Phone number" onChange={getPhone} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Alternate Phone : </Form.Label>
          <Col sm={6}>
            <Form.Control type="text" placeholder="Alternate phone" onChange={getAlphone} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Address Type: </Form.Label>
          <Col sm={6}>
            <Form.Control as="select" sm={3} onChange={getType}>
              <option>Chose your address type</option>
              <option value='home'>Home</option>
              <option value='work'>Work</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Button className='sub my-3' variant="danger" type='submit' >SUBMIT</Button>
      </Form>
      {(status === 0 && phone === '' && address === '') ?
        (
          <Paypal getStatus={(status) => setStatus(status)} />
        ) : ('')}
      <Paying show={show} handleClose={handleClose} />
    </>
  )
}
export default Bill