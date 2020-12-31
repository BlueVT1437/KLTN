import React from 'react'
import './index.scss'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { signOut } from '../../lib/api'
import {withRouter} from 'react-router'
import { Link } from "react-router-dom"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrolled: false,
      token: localStorage.getItem('token'),
      show: false
    };
    // this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 60;
      if (isTop !== true) {
        this.setState({ scrolled: true });
      }
      else {
        this.setState({ scrolled: false });
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {
      const isTop = window.scrollY < 60;
      if (isTop !== true) {
        this.setState({ scrolled: true });
      }
      else {
        this.setState({ scrolled: false });
      }
    })
  }

  render() {
    return (
      <>
        {(this.state.token === '') ? (
          <div className={this.state.scrolled ? 'nav scrolled' : 'nav'}>
            <img src='/img/auction.jpg' alt='' />
            <div className='menu'>
              <ul className='root'>
                <li><a href="">TRANG CHỦ</a></li>
                <li><a href="">GIỚI THIỆU</a></li>
                <li><Link to='/login'>ĐANG ĐẤU GIÁ</Link></li>
                <li><a href="/login">ĐĂNG NHẬP</a></li>
                <li><a href="/register">ĐĂNG KÝ</a></li>
              </ul>
            </div>
          </div>
        ) : (
            <div className={this.state.scrolled ? 'nav scrolled' : 'nav'}>
              <img src='/img/auction.png' alt='' />
              <div className='menu' style={{ marginLeft: '20rem' }}>
                <ul className='root'>
                  <li><a href="">TRANG CHỦ</a></li>
                  <li><a href="">GIỚI THIỆU</a></li>
                  <li><Link to='/auctioning'>ĐANG ĐẤU GIÁ</Link></li>
                  <DropdownButton className='right dropdown-custom' id="dropdown-basic-button" 
                  title={(this.props.firstname !== undefined) ? (this.props.firstname + ' ') : ('Loading')}
                  >
                    <Dropdown.Item onClick={() => this.props.history.push('/profile')}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.history.push('/profile')}>History</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/" onClick={()=> {
                      localStorage.setItem('token', '')
                      signOut()
                    }}>Log out</Dropdown.Item>
                  </DropdownButton>
                  <Button className='btn-img right' >
                    <img alt='bell' src='/img/bell.png' />
                  </Button>
                </ul>
              </div>
            </div>
          )
        }

      </>
    );
  }
}

export default withRouter(Navbar)