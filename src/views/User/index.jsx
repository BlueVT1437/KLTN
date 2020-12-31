import React, { useEffect, useState, useRef } from 'react'
import './index.scss'
import { Link } from 'react-scroll'

import { getAllDiseds } from '../../lib/utils';
import { history } from '../../lib/utils'

//components
import Navbar from '../../components/Navbar'
import Loading from '../../components/Loading'
import ProductList from '../../components/ProductList'

const User = ({ history }) => {

  const [dishes, setDishes] = useState(null)

  useEffect(() => {
    if (dishes === null)
      setDishes(getAllDiseds());
  })

  const searchTextRef = useRef('')

  const Search = () => {
    console.log(searchTextRef.current.value)
    //localStorage.setItem('name', 'kietdeptrai')
  }

  return (
    <div className='User'>
      <Navbar />

      <div className='User-header'>
        <div className='content'>
          BUY AND SELL<br />Authentic Goods
        </div>

        <div className="search">
          <input placeholder="Nhập từ khóa..." className="search-bar" ref={searchTextRef} />
          <div className="search-button" onClick={() => Search()}>
            <i className="fa fa-search" />
          </div>
        </div>

        <button className='sellbtn'>SELL NOW</button>
      </div>

      <div className='User-body'>
        <div className='link'>
          <Link
            activeClass="active"
            to="deadline"
            spy={true}
            smooth={true}
            offset={-20}
            duration={600}
          >
            DEADLINE
          </Link>
          <Link
            activeClass="active"
            to="low price"
            spy={true}
            smooth={true}
            offset={-100}
            duration={600}
          >
            LOW PRICE
          </Link>
          <Link
            activeClass="active"
            to="high price"
            spy={true}
            smooth={true}
            offset={-100}
            duration={600}
          >
            HIGH PRICE
          </Link>
          {/* <Link
            activeClass="active"
            to="Yeezy"
            spy={true}
            smooth={true}
            offset={-100}
            duration={600}
          >
            YEEZY
          </Link> */}
        </div>

        <div className='Brands'>
          {
            <ul className='body-dishes'>
              {
                (dishes !== null) ? (
                  dishes.map((value, i) => (
                    <li key={i} onClick={() => history.push('products')}>
                      <div className='images'>
                        <img className='img1' src={value.imageUrl} />
                      </div>
                      <div className='category'>{value.category}</div>
                    </li>
                  ))
                ) : (<Loading />)
              }
            </ul>
          }
        </div>

        {/* product list */}
        <ProductList brand='deadline' />
        <ProductList brand='low price' />
        <ProductList brand='high price' />
        <ProductList brand='Yeezy' />
      </div>
    </div>
  );
}

export default User;