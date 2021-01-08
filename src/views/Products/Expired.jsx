import React, { useState, useEffect } from 'react'
import './brands.scss'
import { Button, DropdownButton, Dropdown, Toast, Nav, Tab, Row, Col, Form } from 'react-bootstrap'
import Countdown from 'react-countdown'
import { withRouter } from "react-router"

import { sortProductByExpiredAt } from '../../lib/api'

import PaginationBasic from '../../components/Pagination'
import Loading from '../../components/Loading'

const Expired = (props) => {
  const { history } = props
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  let limit = 10

  useEffect(() => {
    const data = { currentPage, limit }
    sortProductByExpiredAt(data).then((response) => {
      setProducts(response.data.results.result)
      setTotal(response.data.total)
    })
  }, [currentPage])

  return (
    <div className='brands pb-3'>
      <p className='text'>ALL PRODUCTS</p>

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
      <PaginationBasic limit={limit} total={total} currentPage={currentPage} onPageChange={(currentPage) => setCurrentPage(currentPage)} />
    </div>
  )
}
export default withRouter(Expired) 