import React, { useEffect, useState } from 'react'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { getProductsNotValid, okProduct } from '../../../lib/api'

const AllOrder = ({ history }) => {
  const [productId, setProductId] = useState('')
  const [valids, setValids] = useState([])

  useEffect(() => {
    getProductsNotValid().then((res) => {
      setValids(res.data.products)
    })
  }, [])

  const products = valids.map((value, i) => {
    return {
      stt: i + 1,
      name: value.name,
      price: new Intl.NumberFormat('de-DE').format(value.startPrice) + ' VND',
      buynow: new Intl.NumberFormat('de-DE').format(value.buyNow) + ' VND',
      step: new Intl.NumberFormat('de-DE').format(value.stepUp) + ' VND',
      id: value._id
    }
  })

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
    text: 'Giá khởi điểm'
  },
  {
    dataField: 'buynow',
    text: 'Giá bán ngay'
  },
  {
    dataField: 'step',
    text: 'Bước giá'
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
      setProductId(row.id)
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>Duyệt sản phẩm</b></h1>
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
      />
      <div className='click ml-70pt py-4'>
        <Button variant="secondary" onClick={() => {
          localStorage.setItem('tokenAd', '')
          history.push('/admin')
        }}>Đăng xuất</Button>
        <Button className='btn-grown' onClick={() => okProduct(productId)}>Duyệt</Button>
      </div>
    </div>
  )
}
export default withRouter(AllOrder)