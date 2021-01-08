import React, { useEffect, useState, useRef } from 'react'
import './index.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import Countdown from 'react-countdown'

import { getAllDiseds } from '../../lib/utils';
import { sortProductByExpiredAt, getuserbytoken, checkExpired, searchProduct } from '../../lib/api'

import Navbar from '../../components/Navbar'
// import Loading from '../../components/Loading'
import ProductList from '../../components/ProductList'
import { Button } from 'react-bootstrap';

const Home = (props) => {
  const { history } = props
  const token = localStorage.getItem('token') || ''
  const [products, setProducts] = useState([])
  const [dishes, setDishes] = useState(null)
  const [user, setUser] = useState({})
  const [check, setCheck] = useState(false)
  const [searchList, setSearchList] = useState([])

  const currentPage = 1
  let limit = 5

  const data = { token, currentPage, limit }
  useEffect(() => {
    if (dishes === null)
      setDishes(getAllDiseds())
    sortProductByExpiredAt(data).then((res) => {
      setProducts(res.data.results.result)
    })
    checkExpired()
  }, [])
  useEffect(() => {
    if (token !== '')
      getuserbytoken(data).then((res) => {
        setUser(res.data.user)
      })
  }, [token])

  const searchTextRef = useRef('')

  const Search = () => {
    const data = { name: searchTextRef.current.value }
    if (searchTextRef.current.value !== '') {
      setCheck(true)
      searchProduct(data).then((res) => {
        setSearchList(res.data.data)
        console.log(searchList)
      })
    }
    else (setCheck(false))
  }

  return (
    <div className='home'>
      <Navbar firstname={user.lastName} />
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

        <Button className='sellbtn' onClick={() => (token !== '') ? (history.push('sell')) : (history.push('login'))}>ĐĂNG SẢN PHẨM</Button>
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
          <div className='name-list'>{(check === false) ? ('Sắp hết hạn') : ('Kết quả tìm kiếm: ')} </div>
          <ul className='body-list'>
            {
              (products !== null && check === false) ? (
                products.map((value, i) => (
                  <li key={i} className='listItemPro' onClick={() => history.push('details/' + value._id)}>
                    <div className='images'>
                      <img className='img1' src={value.productPictures[0]} />
                    </div>
                    <div className='ten'>
                      <div style={{ height: '3rem' }}>{value.name}</div>
                      <Countdown className='fs-20' date={value.expiredAt}
                        // onMount={() => {
                        //   if (value.status !== 1)
                            
                        // }}
                      />
                      <div style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('de-DE').format(value.currentPrice)} VND</div>
                    </div>
                  </li>
                ))
              ) : (
                  (searchList.length > 4) ? (searchList.length = 5) : '',
                  searchList.map((value, i) => (
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
                )
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