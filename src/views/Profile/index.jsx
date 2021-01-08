import React, { useContext, useState, useEffect } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Col, Row, Nav, Tab } from 'react-bootstrap'
// import { ProfileContext } from '../../contexts/profileContext'

import { getuserbytoken } from '../../lib/api'

import Header from '../../components/Header'
import Infomation from './Infomation'
import History from './History'
import Success from './Success'
import Sold from './Sold'

const Profile = () => {
  // const { defaultOrder } = useContext(ProfileContext)
  const token = localStorage.getItem('token')
  const [user, setUser] = useState('')
  const [addressId, setAddressId] = useState('')
  const [userId, setUserId] = useState('')
  const [star, setStar] = useState(5)

  useEffect(() => {
    const data = { token }
    getuserbytoken(data).then((res) => {
      setUser(res.data.user)
      setAddressId(res.data.user.address[0])
      setUserId(res.data.user._id)
      setStar(res.data.user.rating)
    })
  }, [token])

  return (
    <div className='profile pb-3'>
      <Header />
      <div className='profile-header'>
      </div>
      <Tab.Container defaultActiveKey="first" transition={false}>
        <Row style={{ marginRight: '0' }}>
          <Col sm={3} >
            <div className='flex ml-2' style={{borderBottom: '1px solid black'}}>
              <img className='w-5r ml-8' alt='logo' src='/img/auction.jpg' />
            </div>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="first" >Thông tin cá nhân</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="second">Hóa đơn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="third">Đấu giá thành công</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='my-3' eventKey="fourth">Lịch sử</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Infomation user={user} addressId={addressId} star={star} />
              </Tab.Pane>
              <Tab.Pane eventKey="second" >
                <History userId={userId} />
              </Tab.Pane>
              <Tab.Pane eventKey="third" >
                <Success userId={userId} />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth" >
                <Sold userId={userId} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Profile