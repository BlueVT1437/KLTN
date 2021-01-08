import React, { useEffect, useState } from 'react'
import './autions.scss'
import '../../assets/style/custom.scss'
import '../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'

import { getAuctions } from '../../lib/api'

const Auctions = (props) => {
  const { history } = props

  const userId = localStorage.getItem('userId')

  const [flows, setFlows] = useState([])

  useEffect(() => {
    const data = { userId }
    if (userId !== '')
      getAuctions(data).then((res) => {
        setFlows(res.data.results)
      })
  }, [userId])
  
  const changeTime = (value) => {
    let date = new Date(value);
    return date.getHours() + ':' + date.getMinutes() + ' ' + '-' + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
  // const [productId, setProductId] = useState('')

  // let uniqueFlowId = flows.map(v => v.product._id)
  // uniqueFlowId = uniqueFlowId.map((value, i, array) => array.indexOf(value) === i && i)
  // uniqueFlowId = uniqueFlowId.filter(value => flows[value])
  // let uniqueFlow = uniqueFlowId.map(v => flows[v])

  const products = flows.map((value, i) => {

    return {
      stt: i + 1,
      sp: value.name,
      price: new Intl.NumberFormat('de-DE').format(value.currentPrice) + ' VND',
      status: changeTime(value.expiredAt),
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
    dataField: 'status',
    text: 'Thời gian hết hạn'
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
      history.push('/details/'+ row.id)
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>Sản phẩm đang theo dõi</b></h1>
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
      <div className='click ml-80pt py-4'>
        <Button variant="secondary" onClick={() => history.push('/')}>Trở lại</Button>
      </div>
    </div>
  )
}
export default withRouter(Auctions)