import React, { useState } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import { Button, Form, Row, InputGroup, Col } from 'react-bootstrap'

import { createProducts } from '../../lib/api'
import { storage } from "../../firebase";

import Paypal from '../../components/Paypal'
import Header from '../../components/Header'

const Sell = ({ history }) => {
  //Use State
  const userId = localStorage.getItem('userId')
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceReserve, setPriceReserve] = useState(0)
  const [category, setCategory] = useState('')
  const [brands, setBrands] = useState('')
  const [status, setStatus] = useState(0)
  const [time, setTime] = useState('')
  const [sold, setSold] = useState(0)
  const [image, setImage] = useState([])
  let array = []

  //function
  const onSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < image.length; i++) {
      console.log(image[i].name)
      const uploadImage = storage.ref(`images/${image[i].name}`).put(image[i]);

      uploadImage.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image[i].name)
            .getDownloadURL()
            .then((url) => {
              array.push(url)
              const data = {
                price: price,
                name: name,
                time,
                description,
                priceReserve: priceReserve,
                category: category,
                brands: brands,
                sold: sold,
                link: array,
                userId: userId
              }
              if (image.length === array.length) {
                console.log(data)
                createProducts(data)
              }
            });
        }
      )
    }
    window.alert('đăng sản phẩm thành công!')
    history.push('')
  }

  const handleChange = (e) => {
    setImage(e.target.files)
  }

  const getPriceStep = (event) => {
    setPrice((event.target.value) * 1000);
  }

  const getPriceReserve = (event) => {
    setPriceReserve((event.target.value) * 1000);
  }

  const getName = (event) => {
    setName(event.target.value)
  }

  const getCategory = (event) => {
    setCategory(event.target.value)
  }

  const getBrands = (event) => {
    setBrands(event.target.value)
  }

  const getSold = (event) => {
    setSold((event.target.value) * 1000);
  }
  const getDescript = (e) => setDescription(e.target.value)
  const getTime = (e) => setTime(e.target.value)

  return (
    <>
      <Header />
      <div className='sell'>
        <h1 className='fs-30'><b>POST YOUR ITEM</b></h1>
        <h1>*Khoản tiền bạn phải đặt cọc là 20 USD và bạn phải thanh toán Paypal trước khi điền thông tin</h1>
        <Form className='form1' onSubmit={onSubmit}>
          <Form.Group as={Row}>
            <br />
            <Form.Label column sm={10}>Item name</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Item name" onChange={getName} required />
            </Col>
            <Form.Label column sm={10}>Decription</Form.Label>
            <Col sm={10}>
              <Form.Control className='' placeholder='Tell about your product...' as='textarea' onChange={getDescript}></Form.Control>
            </Col>
            <Form.Label column sm={10}>Days</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" placeholder="Days auction" onChange={getTime} />
            </Col>
            <Form.Label column sm={10}>Reserve price</Form.Label>
            <Col sm={10}>
              <InputGroup className="">
                <Form.Control
                  placeholder="Text your money"
                  aria-label="Amount"
                  onChange={getPriceReserve}
                  type="number"
                  pattern="^-?[0-9]\d*\.?\d*$"
                // required
                />
                <InputGroup.Append>
                  <InputGroup.Text>,000</InputGroup.Text>
                  <InputGroup.Text>VND</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <br />
            <Form.Label column sm={10}>Category</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" onChange={getCategory} >
                <option value=''>Chose your type item</option>
                <option value='laptop'>Laptop</option>
                <option value='mobile'>Mobile</option>
                <option value='watch'>Watch</option>
                <option value='tablet'>Tablet</option>
                <option value='accessories'>Accessories</option>
                <option value='camera'>Camera</option>
              </Form.Control>
            </Col>
            <Form.Label column sm={10}>Brands</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" onChange={getBrands} >
                <option value=''>Chose your brands item</option>
                <option value='Asus'>ASUS</option>
                <option value='Apple'>APPLE</option>
                <option value='Others'>OTHERS</option>
              </Form.Control>
            </Col>
            <br />
            <Form.Label column sm={10}>Price step</Form.Label>
            <Col sm={10}>

              <InputGroup className="">
                <Form.Control
                  placeholder="Text your step"
                  aria-label="Amount"
                  onChange={getPriceStep}
                  type="number"
                  pattern="^-?[0-9]\d*\.?\d*$"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text>,000</InputGroup.Text>
                  <InputGroup.Text>VND</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <br />
            <Form.Label column sm={10}>Sell now</Form.Label>
            <Col sm={10}>

              <InputGroup className="">
                <Form.Control
                  placeholder="Text your money"
                  aria-label="Amount"
                  onChange={getSold}
                  type="number"
                  pattern="^-?[0-9]\d*\.?\d*$"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text>,000</InputGroup.Text>
                  <InputGroup.Text>VND</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <br />
            <Col sm={10}>
              <Form.File id="exampleFormControlFile1" label="Chose your image" multiple onChange={handleChange} required />
            </Col>
          </Form.Group>
          {(status === 0 && name === '') ?
            (<Paypal getStatus={(status) => setStatus(status)} />)
            : ('')
          }
          <Button className='my-3 btn-grown fs-25' variant='secondary' style={{ width: '47rem', height: '3.5rem', marginLeft: '14.5rem' }} type='submit' disabled={(status === 0) ? true : false} >
            SUBMIT
        </Button>
        </Form>
      </div>
    </>
  )
}
export default Sell