import React, { useState, useEffect } from 'react'
import './index.scss'

import Loading from '../../components/Loading'
import {getDishesbyCategory } from '../../lib/utils';

const Sneakers = ({brand}) => {

  const [data, setData] = useState([])
  
  const getDataCate = async() => {
    let res = await getDishesbyCategory(brand.toUpperCase())
    return res
  }

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 11
  })

  function handlePageChange(newPage) {
    console.log('New page:', newPage)
  }

  const [filters, setFilters] = useState({
    page: 1,
    limit: 3,
  })

  useEffect(() => {
    getDataCate().then(res => {
      setData(res)
    })
  },[filters])

  return (
    <div className='product-List' id={brand}>
      <div className='name'>{brand.toUpperCase()}</div>
      <ul className='body-dishes'>
        {
          (data !== null) ? (
            data.map((value, i) => (
              <li key={i}>
                <div className='images'>
                  <img className='img1' src={value.imageUrl} />
                </div>
                <div className='category'>{value.name}</div>
              </li>
            ))
          ) : (<Loading />)
        }
      </ul>
    </div>
  )
}

export default Sneakers
