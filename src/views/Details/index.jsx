import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import { Button, Row, Col, Table, Form } from 'react-bootstrap'
import Countdown from 'react-countdown'
import { withRouter } from "react-router"

import Loading from '../../components/Loading'
import Header from '../../components/Header'
import { getProductbyId, getAuctionByProduct, createAuction, checkExpired } from '../../lib/api'
// import {io} from '../../socket';
// import { Socket } from 'socket.io-client'

const Details = (props) => {
  const { match, history } = props

  const [info, setInfo] = useState({})
  const [price, setPrice] = useState(0)
  const [bid, setBid] = useState([])
  const [images, setImages] = useState([])
  const [image, setImage] = useState(images[0])
  const id = match.params.id
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('userId')

  //function
  const data = { id, token, user }

  useEffect(() => {
    getProductbyId(data).then((response) => {
      setInfo(response.data.product)
      setImages(response.data.product.productPictures)
    })
    getAuctionByProduct(data).then((res) => {
      setBid([...res.data.auctions].reverse())
    })
  }, [price])

  const upPrice = () => {
    if (token !== '') {
      if (info.currentPrice < info.buyNow) {

        createAuction(data).then((res) => {
          setPrice(res.data.auction.price)
        })
        // .then(()=>{
        //   io.emit("auction",{room:id})
        // })
      }
      else {
        localStorage.setItem('buynow', info.buyNow)
        history.push('/bill/' + id)
      }
    }
    else
      history.push('/login')
  }

  return (
    <>
      <Header />
      <div className='details py-3 pl-3'>
        <Form className='details-body pt-4'>
          <div className='name mx-5'>{info.name}</div>
          {
            (info !== undefined) ? (
              <Row>
                <Col className='ml-5' sm={3}>
                  <div className='left'>
                    <Button className='btn-img mb-5 h-3r' onClick={() => setImage(images[0])} ><img className='h-3r w-100pt' alt='img1' src={images[0]} /></Button><br />
                    <Button className='btn-img mb-5 h-3r' onClick={() => setImage(images[1])} ><img className='h-3r w-100pt' alt='img1' src={images[1]} /></Button><br />
                    <Button className='btn-img mb-5 h-3r' onClick={() => setImage(images[2])}><img className='h-3r w-100pt' alt='img1' src={images[2]} /></Button><br />
                    <Button className='btn-img h-3r' onClick={() => setImage(images[3])}><img className='h-3r w-100pt' alt='img1' src={images[3]} /></Button>
                  </div>
                  <div className='jc-c flex'>
                    <img className='h-12r my-5' src={image || images[0]} alt='' />
                  </div>
                </Col>
                <Col sm={5}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3} >Description</Form.Label>
                    <Form.Control className='mota' value={info.description} as='textarea' />
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>Price current</Form.Label>
                    <Col sm={7}>
                      <Form.Label className='rbd' as={Row} disabled>{new Intl.NumberFormat('de-DE').format(info.currentPrice || price)} VND</Form.Label>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>Buy Now</Form.Label>
                    <Col sm={7}>
                      <Form.Label className='rbd' as={Row} disabled>{new Intl.NumberFormat('de-DE').format(info.buyNow)} VND</Form.Label>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>Price Step</Form.Label>
                    <Col sm={7}>
                      <Form.Label className='rbd' as={Row} disabled>{new Intl.NumberFormat('de-DE').format(info.stepUp)} VND</Form.Label>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>Expired Time</Form.Label>
                    <Countdown date={new Date(info.expiredAt)}
                      onStop={() => {
                        checkExpired()
                        history.push('/')
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Row} className='action'>
                    <Button variant="success"
                      onClick={upPrice}
                    >AUCTION</Button>
                    <Button variant="danger"
                      className='mx-5'
                      onClick={() => {
                        localStorage.setItem('buynow', info.buyNow)
                        history.push('/bill/' + id)
                      }}
                    >BUY NOW</Button>
                    <Button className='btn-grown'
                      onClick={() => window.location.reload()}
                    >REFRESH</Button>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Table className='table-custom' hover striped bordered responsive>
                    <thead>
                      <tr>
                        <th>User name</th>
                        <th>Price bid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (bid !== null) ? (
                          // (bid.length > 4) ? (bid.length = 5) : '',
                          bid.map((value, i) => {
                            return (
                              <tr key={i} className='' >
                                <td>{value.user.username}</td>
                                <td>{new Intl.NumberFormat('de-DE').format(value.price)} VND</td>
                              </tr>
                            )
                          })
                        ) : (<Loading />)
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : <Loading />}
        </Form>
      </div>
    </>
  )
}

export default withRouter(Details)

