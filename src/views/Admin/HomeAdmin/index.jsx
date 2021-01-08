import React from 'react'
import './index.scss'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Tab, Col, Row, Nav } from 'react-bootstrap'

import User from './User'
import AllProduct from './AllProduct'
import AllOrder from './AllOrder'
import Revenue from './Revenue'
import AllBill from './AllBill'

const HomeAdmin = () => {
  return (
    <div className='homeAdmin py-3'>

      <Tab.Container defaultActiveKey="first" transition={false}>
        <Row style={{ marginRight: '0' }}>
          <Col sm={3} >
            <div className='flex ml-2' style={{ borderBottom: '1px solid black' }}>
              <img className='w-5r ml-8' alt='logo' src='/img/auction.jpg' />
            </div>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="first" >Quản lý user</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="second">Quản lý sản phẩm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="third">Quản lý hóa đơn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="fourth">Duyệt sản phẩm</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="fifth">Thống kê doanh thu</Nav.Link>
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
                <AllBill />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth" >
                <AllOrder />
              </Tab.Pane>
              <Tab.Pane eventKey="fifth" >
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

