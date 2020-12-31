import React, { useState, useEffect } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import { Col, Row, Form, Nav, Tab } from 'react-bootstrap'

import Auctions from './Auctions'
import Header from '../../components/Header'
import Selling from './Selling'

const Auctioning = (props) => {

  return (
    <div className='auctioning pb-3'>
      <Header />
      <Tab.Container defaultActiveKey="first" transition={false}>
        <Row style={{ marginRight: '0' }}>
          <Col sm={3} >
            <Form.Label className='fs-25 ml-2 mt-3'><b>Welcome to AK Website</b></Form.Label>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className='fs-20' eventKey="first" >Đang theo dõi</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Đang đấu giá</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Auctions />
              </Tab.Pane>
              <Tab.Pane eventKey="second" >
                <Selling />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
export default Auctioning