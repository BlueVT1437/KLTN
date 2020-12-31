import React from 'react'
import './index.scss'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Tab, Col, Row, Nav, Form } from 'react-bootstrap'
// import Order from '../Order'
import User from './User'
import AllProduct from './AllProduct'
import AllOrder from './AllOrder'
import Revenue from './Revenue'

const HomeAdmin = () => {
  return (
    <div className='homeAdmin py-3'>
      <header>
        <img className='w-5r m-3' src='/img/auction.png' alt='logo' />
        {/* <p className='flex jc-c fs-30'>AK Website</p> */}
      </header>
      <Tab.Container defaultActiveKey="first" transition={false}>
        <Row style={{ marginRight: '0' }}>
          <Col sm={3} >
            <Form.Label className='fs-25 ml-2 mt-3'><b>Quản lý Website</b></Form.Label>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className='fs-20' eventKey="first" >Quản lý user</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Quản lý sản phẩm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Duyệt sản phẩm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Thống kê doanh thu</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <User />
              </Tab.Pane>
              <Tab.Pane eventKey="second" >
                <AllProduct />
              </Tab.Pane>
              <Tab.Pane eventKey="third" >
                <AllOrder />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth" >
                <Revenue />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default HomeAdmin

