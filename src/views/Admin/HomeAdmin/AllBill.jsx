import React, { useEffect, useState } from 'react'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'
import paginationFactory from 'react-bootstrap-table2-paginator'

import PayBill from './PayBill'

import { getBill, updateStatus } from '../../../lib/api'

const AllOrder = ({ history }) => {
  const [show, setShow] = useState(false)
  const [valids, setValids] = useState([])
  const [check, setCheck] = useState(true)
  const [orderId, setOrderId] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const changeTime = (value) => {
    let date = new Date(value);
    return (date.getHours() + ':' + date.getMinutes() + ' ' + '-' + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
  }

  useEffect(() => {
    getBill().then((res) => {
      setValids(res.data.results.result)
    })
  }, [])

  const statusTmp = {
    0: 'Đang giao hàng',
    1: 'Đã nhận hàng',
    2: 'Đã thanh toán',
    3: 'Hết hạn đổi',
    4: 'Hủy bỏ'
  }

  const products = valids.map((value, i) => {
    return {
      stt: i + 1,
      name: value.productId.name,
      price: new Intl.NumberFormat('de-DE').format(value.price + 100000 - 0) + ' VND',
      buynow: value.userId.username,
      seller: value.seller.username,
      status: new Intl.NumberFormat('de-DE').format(value.price * 10 / 100 - 0) + ' VND',
      time: changeTime(value.CheckoutTime),
      delivery: value.status2 ? statusTmp[value.status2] : ('Đang giao hàng'),
      buy: (value.price - value.price * 10 / 100 - 0),
      ID: value._id
    }
  })

  const columns = [{
    dataField: 'stt',
    text: 'STT',
    style: { minWidth: '1rem' }
  },
  {
    dataField: 'name',
    text: 'Tên sản phẩm',
    style: { minWidth: '20rem' }
  },
  {
    dataField: 'price',
    text: 'Tiền hóa đơn',
    style: { width: '30rem' }
  },
  {
    dataField: 'buynow',
    text: 'Người mua',
    style: { width: '55rem', wordBreak: 'break-all' }
  },
  {
    dataField: 'seller',
    text: 'Người bán',
    style: { width: '5rem' }
  },
  {
    dataField: 'status',
    text: 'Tiền phí',
    style: { width: '40rem' }
  },
  {
    dataField: 'time',
    text: 'Thời điểm thanh toán',
    style: { width: '40rem' }
  },
  {
    dataField: 'delivery',
    text: 'Trạng thái',
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
      console.log(row);
      if (row.delivery === "Đã nhận hàng") {
        setCheck(false)
        setOrderId(row.ID)
      }
      else
        setCheck(true)
      if (row.delivery === "Hết hạn đổi") {
        localStorage.setItem('buynow', row.buy)
        setOrderId(row.ID)
        handleShow()
      }
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>Quản lý hóa đơn</b></h1>
      <BootstrapTable
        keyField="stt"
        data={products}
        columns={columns}
        bordered={false}
        hover
        selectRow={selectRow}
        rowEvents={rowEvents}
        responsive
        pagination={paginationFactory()}
      />
      <div className='click ml-70pt py-4'>
        <Button className='ml-5' variant="secondary" onClick={() => {
          localStorage.setItem('tokenAd', '')
          history.push('/admin')
        }}>Đăng xuất</Button>
        {console.log(check)}
        <Button className='btn-grown' disabled={check} onClick={() => {
          const data = { orderId, charge: 0 }
          updateStatus(data)
          setCheck(true)
        }} >Hủy bỏ</Button>
      </div>
      <PayBill show={show} handleClose={handleClose} orderId={orderId} />
    </div>
  )
}
export default withRouter(AllOrder)