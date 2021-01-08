import React, { useState, useEffect } from 'react'
import './brands.scss'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import Countdown from 'react-countdown'
import { withRouter } from "react-router"

import { getProducts } from '../../lib/api'

import PaginationBasic from '../../components/Pagination'
import Loading from '../../components/Loading'

const Brands = (props) => {
  const { brand, history } = props
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  let limit = 10
  useEffect(() => {
    const data = { brand, currentPage, limit }
    getProducts(data).then((response) => {
      setProducts(response.data.results.result)
      setTotal(response.data.total)
    })
  }, [currentPage])

  return (
    <div className='brands pb-3'>
      {
        (products[0] !== undefined) ? (
          <div className='text'>
            {products[0].category.toUpperCase()}
          </div>
        ) : ('')
      }
      {/* <DropdownButton alignRight title="Filter" className='sort'>
        <Dropdown.Item eventKey="#/action-1">Time</Dropdown.Item>
        <Dropdown.Item eventKey="#/action-2">Low Price</Dropdown.Item>
      </DropdownButton> */}

      <div className='goods mb-3'>
        <ul className='body-dishes mx-4'>
          {
            (products !== undefined) ? (
              products.map((value, i) => (
                <li key={i} className='ml-4' onClick={() => history.push('/details/' + value._id)}>
                  <div className='images mt-2'>
                    <img className='img1' alt='' src={value.productPictures[0]} />
                  </div>
                  <div className='cont'>
                    <div className='category'>{value.name}</div>
                    <Countdown date={value.expiredAt} />
                    <div>{new Intl.NumberFormat('de-DE').format(value.currentPrice)} VND</div>
                  </div>
                </li>
              ))
            ) : (<Loading />)
          }
        </ul>
      </div>
      <PaginationBasic limit={limit} total={total} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  )
}
export default withRouter(Brands) 