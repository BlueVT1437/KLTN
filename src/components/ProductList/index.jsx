import React, { useState, useEffect } from 'react'
import './index.scss'

import Countdown from 'react-countdown'
import Loading from '../../components/Loading'
import { getProducts } from '../../lib/api'
import { withRouter } from "react-router"
import { Link } from "react-router-dom"

const ProductList = ({ brand, history }) => {
  const [products, setProducts] = useState([])
  const currentPage = 1
  let url = '/products/' + brand
  let limit = 5

  useEffect(() => {
    const data = { brand, currentPage, limit }
    getProducts(data).then((response) => {
      setProducts(response.data.results.result)
    })
  }, [currentPage])

  return (
    <div className='product-List' id={brand}>
      <div className='name-list'>{brand.toUpperCase()}</div>
      <ul className='body-dishes'>
        {
          (products !== null) ? (
            // (products.length > 4) ? (products.length = 5) : '',
            products.map((value, i) => (
              <li key={i} className='listItemPro' onClick={() => history.push('details/' + value._id)}>
                {
                  (value.status === 1) ? (
                    <>
                      <div className='images'>
                        <img className='img1' src={value.productPictures[0]} />
                      </div>
                      <div className='ten'>
                        <div style={{ height: '3rem' }}>{value.name}</div>
                        <Countdown className='fs-20' date={value.expiredAt} />
                        <div style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('de-DE').format(value.currentPrice)} VND</div>
                      </div>
                    </>
                  ) : ('')
                }
              </li>
            ))
          ) : (<Loading />)
        }
        {/* <a className='ml-4' href='/products'>View All →</a> */}
        <Link className='ml-4' to={url}>View All →</Link>
      </ul>
    </div>
  )
}

export default withRouter(ProductList)
