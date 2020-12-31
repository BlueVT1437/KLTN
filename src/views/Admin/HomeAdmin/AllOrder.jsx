import React, { useEffect, useState } from 'react'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'

import { getProductsNotValid } from '../../../lib/api'

const AllOrder = ({ history }) => {

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
      buynow: new Intl.NumberFormat('de-DE').format('200000') + ' VND',
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
  ]

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#b18a70',
    hideSelectColumn: true,
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // setInfo(histories[0])
      window.alert('click ' + rowIndex)
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
          history.push('/')
        }}>Đăng xuất</Button>
        <Button className='btn-grown'>Duyệt</Button>
      </div>
    </div>
  )
}
export default withRouter(AllOrder)