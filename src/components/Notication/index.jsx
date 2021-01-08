import React from 'react'
import './index.scss'

const Notication = (props) => {
  const { auction, order } = props

  const changeTime = (value) => {
    let date = new Date(value);
    return (date.getHours() + ':' + date.getMinutes() + ' ' + '-' + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
  }
  return (
    <div className='notication'>
      {
        auction.map((value, i) => (
          <div>Bạn đã đấu giá thành công sản phẩm {value.product.name}
            {/* <br /> Lúc: {changeTime(value.updatedAt)} */}
          </div>
        ))
      }
      {
        order.map((value, i) => (
          <div>Bạn đã thanh toán sản phẩm {value.productId.name}
            <br /> Lúc: {changeTime(value.createdAt)}
          </div>
        ))
      }
    </div>
  )
}
export default Notication