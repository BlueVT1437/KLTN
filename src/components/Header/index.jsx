import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Button, Dropdown, DropdownButton, Toast } from 'react-bootstrap'
import { withRouter } from 'react-router'

import { signOut, getuserbytoken, getAuctionSuccess, getOrder } from '../../lib/api'

import Notic from '../Notication'

const Header = (props) => {
  const { history } = props

  const token = localStorage.getItem('token') || ''
  const userId = localStorage.getItem('userId') || ''
  const [user, setUser] = useState({})
  const [auction, setAuction] = useState([])
  const [order, setOrder] = useState([])
  const [showA, setShowA] = useState(false)

  const toggleShowA = () => setShowA(!showA)
  const data = { token, userId }

  useEffect(() => {
    getuserbytoken(data).then((res) => {
      setUser(res.data.user)
    })

  }, [token])
  useEffect(() => {
    if (userId !== '') {
      getAuctionSuccess(data).then((res) => {
        setAuction(res.data.auctions)
      })
      getOrder(data).then((res) => {
        setOrder(res.data.order)
      })
    }
  }, [userId])

  localStorage.setItem('userId', userId)

  useEffect(() => {
    const data = { userId }
    if (userId !== '') {
      getAuctionSuccess(data).then((res) => {
        setAuction(res.data.auctions)
      })
    }
  }, [userId])

  return (
    <div className='header'>
      <img src='/img/auction.png' alt='logo' />
      <h1>AK Website</h1>
      {
        (token !== '') ? (
          <>
            <DropdownButton className='right dropdown-custom mt-4' id="dropdown-basic-button"
              title={(user.lastName !== undefined) ? (user.lastName) : ('Loading')}>
              <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => history.push('/profile')}>History</Dropdown.Item>
              <Dropdown.Item onClick={() => history.push('/')}>Home</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => {
                localStorage.setItem('token', '')
                localStorage.setItem('userId', '')
                signOut()
                history.push('')
              }}>Log out</Dropdown.Item>
            </DropdownButton>
            <Toast className='notic' style={{ top: '9%', left: '65%' }} show={showA} onClose={toggleShowA}>
              <Toast.Header>
                <strong className="mr-auto">Thông báo</strong>
                {/* <small>11 mins ago</small> */}
              </Toast.Header>
              <Toast.Body>
                <Notic auction={auction} order={order} />
              </Toast.Body>
            </Toast>
            <Button className='btn-img right mr-12 mt-2r' onClick={toggleShowA}>
              <img alt='bell' src='/img/bell.png' />
            </Button>
          </>
        ) : (
            <>
              <Button className='btn-grown right mr-5 my-4' onClick={() => history.push('/register')}>Đăng ký</Button>
              <Button className='btn-grown right mr-5 my-4' onClick={() => history.push('/login')}>Đăng nhập</Button>
            </>
          )
      }

    </div>
  );
}

export default withRouter(Header)