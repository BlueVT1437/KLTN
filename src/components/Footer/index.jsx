import React from 'react'
import './index.scss'

const Footer = () => {

  return (
    <div className='footer'>
      <img alt='footer' src='/img/footer.PNG' />
      <div className='social'>
        <div className='text'>
          <div>Người sử dụng</div>
          <div>Giao dịch thành công</div>
          <div>Quản trị viên</div>
          <div>Giao dịch trong ngày</div>
        </div>
        {/* <div className='icon'>
          <div className="facebook">
            <a href="https://www.facebook.com/camap.beo.90/" target="_blank"><i className="fab fa-facebook-square" ></i></a>
          </div>
          <div className="instagram">
            <a href="https://www.instagram.com/kieettran/" target="_blank"><i className="fab fa-instagram"></i></a>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Footer;