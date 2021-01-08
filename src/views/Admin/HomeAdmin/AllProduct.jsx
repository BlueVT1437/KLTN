import React, { useEffect, useState } from 'react'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { getAllProducts } from '../../../lib/api'

import InfoProduct from './InfoProduct'

const AllProduct = ({ history }) => {

  const [show, setShow] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [pictures, setPictures] = useState([])

  useEffect(() => {
    getAllProducts().then((res) => {
      setAllProducts(res.data.results.result)
    })
  }, [])

  const products = allProducts.map((value, i) => {
    return {
      stt: i + 1,
      name: value.name,
      price: new Intl.NumberFormat('de-DE').format(value.currentPrice) + ' VND',
      status: (value.role === 1) ? "Đang đấu giá" : "Đã hết hạn",
      pictures: value.productPictures,
      id: value._id
    }
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const columns = [{
    dataField: 'stt',
    text: 'STT'
  },
  {
    dataField: 'name',
    text: 'Tên sản phẩm'
  },
  {
    dataField: 'price',
    text: 'Giá hiện tại'
  },
  {
    dataField: 'status',
    text: 'Trạng thái đấu giá'
  },
  ]

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#b18a70',
    hideSelectColumn: true,
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setPictures(row.pictures)
      handleShow()
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>Tất cả sản phẩm</b></h1>
      <BootstrapTable
        keyField="stt"
        data={products}
        columns={columns}
        bordered={false}
        classes='table-custom'
        hover
        responsive
        selectRow={selectRow}
        rowEvents={rowEvents}
        pagination={paginationFactory()}
      />
      <div className='click ml-80pt py-4'>
        <Button className='ml-5' variant="secondary" onClick={() => {
          localStorage.setItem('tokenAd', '')
          history.push('/admin')
        }}>Đăng xuất</Button>
      </div>
      <InfoProduct show={show} handleClose={handleClose} pictures={pictures} />
    </div>
  )
}
export default withRouter(AllProduct)