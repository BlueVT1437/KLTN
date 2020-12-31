import React, { useState, useRef, useEffect } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import { Button, DropdownButton, Dropdown, Toast, Nav, Tab, Row, Col } from 'react-bootstrap'

import { getuserbytoken, signOut } from '../../lib/api'

import Notic from '../../components/Notication'
import Brands from './Brands'
import Expired from './Expired'
import Header from '../../components/Header'

const Products = (props) => {
  const { history, match } = props

  const searchTextRef = useRef('')
  const token = localStorage.getItem('token')
  const abc = match.params.brand || 'expired'

  const [showA, setShowA] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const data = { token }
    getuserbytoken(data).then((res) => {
      setUser(res.data.user)
    })
  }, [])
  const toggleShowA = () => setShowA(!showA);
  const Search = () => {
    console.log(searchTextRef.current.value)
  }

  return (
    <div className='products'>
      {/* <div className='products-header'>
        <img src='/img/auction.jpg' alt='logo' />
        <h1>AK Website</h1>
        <div className="search">
          <input placeholder=" Nhập từ khóa..." className="search-bar" ref={searchTextRef} />
          <div className="search-button" onClick={() => Search()}>
            <i className="fa fa-search" />
          </div>
        </div>
        <Toast className='notic' show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="mr-auto">Thông báo</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <Notic />
          </Toast.Body>
        </Toast>
        <DropdownButton className='right dropdown-custom' id="dropdown-basic-button" title={user.username}>
          <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => history.push('/profile')}>History</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => {
            localStorage.setItem('token', '')
            localStorage.setItem('userId', '')
            signOut()
            history.push('')
          }}>Log out</Dropdown.Item>
        </DropdownButton>
        <Button className='btn-img right' onClick={toggleShowA}>
          <img alt='bell' src='/img/bell.png' />
        </Button>
        <Button className='sellbtn btn-grown' onClick={() => (token !== '') ? (history.push('sell')) : (history.push('login'))}>SELL NOW</Button>
      </div> */}
      <Header/>
      <div className='products-body py-4'>
        <Tab.Container defaultActiveKey={abc} transition={false}>
          <Row className='mr-0 pl-4'>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="expired" >EXPIRED</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="laptop" >LAPTOP</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="mobile">MOBILE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="watch">SMART WATCH</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="tablet">TABLET</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="accessories">ACCESSORIES</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='my-2' eventKey="camera">CAMERA</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="expired">
                  <Expired />
                </Tab.Pane>
                <Tab.Pane eventKey="laptop" >
                  <Brands brand='laptop' />
                </Tab.Pane>
                <Tab.Pane eventKey="mobile" >
                  <Brands brand='mobile' />
                </Tab.Pane>
                <Tab.Pane eventKey="watch" >
                  <Brands brand='watch' />
                </Tab.Pane>
                <Tab.Pane eventKey="tablet" >
                  <Brands brand='tablet' />
                </Tab.Pane>
                <Tab.Pane eventKey="accessories" >
                  <Brands brand='accessories' />
                </Tab.Pane>
                <Tab.Pane eventKey="camera" >
                  <Brands brand='camera' />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

      </div>
    </div>
  )
}

export default Products;