import React, { useEffect, useState, useRef } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import Countdown from 'react-countdown'

import { getAllDiseds } from '../../lib/utils';
import { sortProductByExpiredAt, getuserbytoken, checkExpired } from '../../lib/api'
//components
import Navbar from '../../components/Navbar'
import Loading from '../../components/Loading'
import ProductList from '../../components/ProductList'
import { Button } from 'react-bootstrap';

const Home = (props) => {
  const { history } = props
  const [products, setProducts] = useState([])
  const [dishes, setDishes] = useState(null)
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token') || ''

  const currentPage = 1
  let limit = 5

  useEffect(() => {
    const data = { token, currentPage, limit }
    if (dishes === null)
      setDishes(getAllDiseds())
    sortProductByExpiredAt(data).then((res) => {
      setProducts(res.data.results.result)
    })
    getuserbytoken(data).then((res) => {
      setUser(res.data.user)
    })
  }, [])
  const searchTextRef = useRef('')

  const Search = () => {
    console.log(searchTextRef.current.value)
  }

  return (
    <div className='home'>
      <Navbar firstname={user.username} />
      <div className='home-header'>
        <div className='content'>
          BUY AND SELL<br />Authentic Goods
        </div>

        <div className="search">
          <input placeholder="Nhập từ khóa..." className="search-bar bd" ref={searchTextRef} />
          <Button className="search-button bd" onClick={Search}>
            <i className="fa fa-search" />
          </Button>
        </div>

        <Button className='sellbtn' onClick={() => (token !== '') ? (history.push('sell')) : (history.push('login'))}>SELL NOW</Button>
      </div>

      <div className='home-body py-4'>

        <div className='Brands'>
          <div className='brands-child ta-c mt-4' onClick={() => { history.push('products') }}>
            <img src='/img/laptopp.png' alt='' />
            <br />
            <h1 className='fs-20 mb-1'><b>LAPTOP</b></h1>
          </div>

          <div className='brands-child ta-c mt-4' onClick={() => { history.push('products') }}>
            <img src='/img/iPhone-12.jpg' alt='' />
            <br />
            <h1 className='fs-20 mb-1'><b>MOBILE</b></h1>
          </div>

          <div className='brands-child ta-c mt-4' onClick={() => { history.push('products') }}>
            <img src='/img/iw.jpeg' alt='' />
            <br />
            <h1 className='fs-20 mb-1'><b>SMART WATCH</b></h1>
          </div>

          <div className='brands-child ta-c mt-4' onClick={() => { history.push('products') }}>
            <img src='/img/tablet.jpg' alt='' />
            <br />
            <h1 className='fs-20 mb-1'><b>TABLET</b></h1>
          </div>

          <div className='brands-child ta-c mt-4' onClick={() => { history.push('products') }}>
            <img src='/img/headph.jpg' alt='' />
            <br />
            <h1 className='fs-20 mb-1'><b>ACCESSORIES</b></h1>
          </div>

          <div className='brands-child ta-c mt-4' onClick={() => { history.push('products') }}>
            <img src='/img/canon.jpg' alt='' />
            <br />
            <h1 className='fs-20 mb-1'><b>CAMERA</b></h1>
          </div>
        </div>

        <div className='product-List'>
          <div className='name-list'>EXPIRE </div>
          <ul className='body-dishes'>
            {
              (products !== null) ? (
                // (products.length > 4) ? (products.length = 5) : '',
                products.map((value, i) => (
                  <li key={i} className='listItemPro' onClick={() => history.push('details/' + value._id)}>
                    <div className='images'>
                      <img className='img1' src={value.productPictures[0]} />
                    </div>
                    <div className='ten'>
                      <div style={{ height: '3rem' }}>{value.name}</div>
                      <Countdown className='fs-20' date={value.expiredAt}
                        onMount={() => {
                          checkExpired()
                          history.push('/')
                        }}
                      />
                      <div style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('de-DE').format(value.currentPrice)} VND</div>
                    </div>
                  </li>
                ))
              ) : (<Loading />)
            }
            <a className='ml-4' href='/products'>View All →</a>
          </ul>
        </div>
        <ProductList brand='laptop' />
        <ProductList brand='mobile' />
        <ProductList brand='watch' />
        <ProductList brand='tablet' />
        <ProductList brand='accessories' />
        <ProductList brand='camera' />
      </div>
    </div>
  );
}

export default Home;