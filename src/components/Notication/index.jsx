import React from 'react'
import './index.scss'

const Notication = (props) => {
  const { auction } = props
  console.log(auction);
  // const changeTime = (value) => {
  //   let date = new Date(value);
  //   return date.getHours() + ':' + date.getMinutes() + ' ' + '-' + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  // }
  return (
    <div className='notication'>
      {
        auction.map((value, i) => (
          <div>Bạn đã đấu giá thành công sản phẩm {value.product.name} vào lúc {(value.createdAt)}</div>
        ))
      }
    </div>
  )
}
export default Notication