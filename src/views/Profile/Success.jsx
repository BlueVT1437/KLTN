import React, { useEffect, useState } from 'react'
import './history.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'

import { getAuctionSuccess } from '../../lib/api'

const Success = (props) => {
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
      getAuctionSuccess(data).then((res) => {
        setAuctions(res.data.auctions)
      })
    }
  }, [userId])

  const products = auctions.map((value, i) => {
    return {
      stt: i + 1,
      sp: (value.product) ? (value.product.name) : '',
      price: new Intl.NumberFormat('de-DE').format(value.price) + ' VND',
      status: "100.000 VND",
      time: new Intl.NumberFormat('de-DE').format(value.price + 100000 - 0) + ' VND',
      id: (value.product) ? value.product._id : ''
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
    dataField: 'status',
    text: 'Tiền ship'
  },
  {
    dataField: 'time',
    text: 'Tổng tiền'
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
      <h1 className='fs-25 py-3 ml-4' ><b>Đấu giá thành công</b></h1>
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
export default withRouter(Success)