import React, { useEffect, useState } from 'react'
import './history.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'

import { getSold } from '../../lib/api'

const Sold = (props) => {
  const { userId, history } = props

  const [auctions, setAuctions] = useState([])
  const [productId, setProductId] = useState('')

  const changeTime = (value) => {
    let date = new Date(value);
    return (date.getHours() + ':' + date.getMinutes() + ' ' + '-' + ' ' + (date.getDate() + 3 - 0) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
  }
  useEffect(() => {
    const data = { userId }
    if (userId !== '') {
      getSold(data).then((res) => {
        setAuctions(res.data.products)
      })
    }
  }, [userId])

  const products = auctions.map((value, i) => {
    return {
      stt: i + 1,
      sp: value.name,
      price: new Intl.NumberFormat('de-DE').format(value.currentPrice) + ' VND',
      fee: new Intl.NumberFormat('de-DE').format(value.currentPrice * 10 / 100) + ' VND',
      time: new Intl.NumberFormat('de-DE').format(value.currentPrice - value.currentPrice * 10 / 100) + ' VND',
      status: (value.status === '3') ? ('Thành công') : ('Thất bại'),
      id: value._id
    }
  })

  const columns = [{
    dataField: 'stt',
    text: 'STT'
  },
  {
    dataField: 'sp',
    text: 'Tên sản phẩm'
  },
  {
    dataField: 'price',
    text: 'Số tiền đấu giá'
  },
  {
    dataField: 'fee',
    text: 'Tiền phí'
  },
  {
    dataField: 'time',
    text: 'Tiền nhận được'
  },
  {
    dataField: 'status',
    text: 'Đấu giá'
  },
  {
    dataField: 'money',
    text: 'Thanh toán'
  }
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
      <h1 className='fs-25 py-3 ml-4' ><b>Sản phẩm đã đấu giá</b></h1>
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        bordered={false}
        classes='table-custom'
        hover
        responsive
        selectRow={selectRow}
        rowEvents={rowEvents}
      />
      <div className='click ml-80pt py-4'>
        <Button variant="secondary" onClick={() => history.push('/')}>Trở lại</Button>
        <Button className='btn-grown' onClick={() => history.push('/bill/' + productId)} >Xác nhận</Button>
      </div>
    </div>
  )
}
export default withRouter(Sold)