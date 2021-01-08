import React from 'react'
import './index.scss'

const Footer = () => {

  return (
    // <div classNameName='footer'>
    //   <img alt='footer' src='/img/footer.PNG' />
    //   <div classNameName='social'>
    //     <div classNameName='text'>
    //       <div>Người sử dụng</div>
    //       <div>Giao dịch thành công</div>
    //       <div>Quản trị viên</div>
    //       <div>Giao dịch trong ngày</div>
    //     </div>
    //     {/* <div classNameName='icon'>
    //       <div classNameName="facebook">
    //         <a href="https://www.facebook.com/camap.beo.90/" target="_blank"><i classNameName="fab fa-facebook-square" ></i></a>
    //       </div>
    //       <div classNameName="instagram">
    //         <a href="https://www.instagram.com/kieettran/" target="_blank"><i classNameName="fab fa-instagram"></i></a>
    //       </div>
    //     </div> */}
    //   </div>
    // </div>
    <footer className="text-center text-lg-start footer">
      <div className="container pt-3">

        <div className="row">
          <div className="col-lg-6 mb-4 mr-5">
            <h3 className="text-uppercase" style={{ fontSize: '20px' }}>AK Website</h3>
            <br />
            <p>
              Cảm ơn tất cả mọi người đã tin tưởng và sử dụng AK Website. Chúng tôi đã và đang cố gắng
              mang lại cho mọi người sự tiện nghi và uy tín trong mọi cuộc đấu giá về công nghệ.
            </p>
          </div>
          <div className="mb-4" style={{marginLeft: '10rem'}}>
            <h5 className="text-uppercase">Link Mạng xã hội của chúng tôi</h5>
            <br />
            <ul className="list-unstyled mb-0">
              <li>
                <a href="https://www.facebook.com/camap.beo.90/" target="_blank"><i className="fab fa-facebook-square" style={{ fontSize: '30px', float: 'left', marginLeft: '5rem', marginRight: '5rem' }} ></i></a>
              </li>

              <li>
                <a href="https://www.instagram.com/kieettran/" target="_blank"><i className="fab fa-instagram" style={{ fontSize: '30px', float: 'left' }}></i></a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;