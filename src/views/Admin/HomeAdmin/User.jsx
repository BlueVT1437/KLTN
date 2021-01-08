import React, { useEffect, useState } from 'react'
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { withRouter } from 'react-router'

import { getAllUsers, lockUser } from '../../../lib/api'

const User = ({ history }) => {

  const [user, setUser] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    getAllUsers().then((res) => {
      setUser(res.data.results.result)
    })
  }, [])

  const products = user.map((value, i) => {
    return {
      stt: i + 1,
      sp: value.firstName + ' ' + value.lastName,
      price: value.rating || 'Chưa có đánh giá',
      status: value.username,
      sdt: value.contactNumber,
      email: value.email,
      role: value.role,
      userId: value._id
    }
  })

  const columns = [{
    dataField: 'stt',
    text: 'STT'
  },
  {
    dataField: 'status',
    text: 'User name'
  },
  {
    dataField: 'sp',
    text: 'Tên đầy đủ'
  },
  {
    dataField: 'price',
    text: 'Đánh giá'
  },
  {
    dataField: 'email',
    text: 'Email'
  },
  {
    dataField: 'sdt',
    text: 'Số điện thoại'
  },
  {
    dataField: 'role',
    text: 'Quyền'
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
      // handleShow()
      setUserId(row.userId)
    }
  }

  return (
    <div className='history p-3'>
      <h1 className='fs-25 py-3 ml-4' ><b>Quản lý user</b></h1>
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
        <Button className='btn-grown' onClick={() => lockUser(userId)}>Khóa</Button>
      </div>
    </div>
  )
}
export default withRouter(User)