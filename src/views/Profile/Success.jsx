import React, { useEffect, useState } from 'react'
import './history.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'

import { getAuctionSuccess } from '../../lib/api'

import Rating from './Rating'

const Success = (props) => {
  const { userId, history } = props

  const [show, setShow] = useState(false)
  const [auctions, setAuctions] = useState([])
  const [productId, setProductId] = useState('')

  useEffect(() => {
    const data = { userId }
    if (userId !== '') {
      getAuctionSuccess(data).then((res) => {
        setAuctions(res.data.auctions)
      })
    }
  }, [userId])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const products = auctions.map((value, i) => {
    return {
      stt: i + 1,
      sp: value.product.name,
      price: value.price,
      status: "Thành công",
      id: value.product._id
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
      setProductId(row.id)
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>History</b></h1>
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
      <div className='click ml-70pt py-4'>
        <Button variant="secondary" onClick={() => history.push('')}>Trở lại</Button>
        <Button className='btn-grown' onClick={() => history.push('/bill/' + productId)} >Xác nhận</Button>
      </div>
      <Rating show={show} handleClose={handleClose} />
    </div>
  )
}
export default withRouter(Success)