import React, { useEffect, useState } from 'react'
import './history.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import BootstrapTable from 'react-bootstrap-table-next'
import { Button } from 'react-bootstrap'

import { getOrder } from '../../lib/api'

import Rating from './Rating'

const History = (props) => {
  const { userId, history } = props

  const [show, setShow] = useState(false)
  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const data = { userId }
    if (userId !== '') {
      getOrder(data).then((res) => {
        setOrders(res.data.order)
      })
    }
  }, [userId])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const products = orders.map((value, i) => {
    return {
      stt: i + 1,
      sp: value.productId.name,
      price: value.price,
      status: (value.status == 0) ? ("Chưa thanh toán") : ("Đã thanh toán"),
      star: value.star || "Chưa đánh giá",
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
    dataField: 'star',
    text: 'Đánh giá',
  },
  {
    dataField: 'price',
    text: 'Số tiền đấu giá'
  },
  {
    dataField: 'status',
    text: 'Trạng thái'
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
      if (row.star === "Chưa đánh giá") {
        handleShow()
        setOrderId(row.id)
      }
      // console.log(row)
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>Invoices</b></h1>
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
      <Rating show={show} handleClose={handleClose} orderId={orderId} />
      <div className='click ml-70pt py-4'>
        <Button variant="secondary" onClick={() => history.push('')}>Trở lại</Button>
        {/* <Button className='btn-grown' type='submit'>Lưu thay đổi</Button> */}
      </div>
    </div>
  )
}
export default History