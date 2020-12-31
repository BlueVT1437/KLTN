import React, { useState } from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import { withRouter } from "react-router"
import '../../../assets/style/custom.scss'
import '../../../assets/style/props.scss'

function InfoUser(props) {
  const { show, handleClose, pictures } = props
  const [image, setImage] = useState(pictures[0])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className='ml-4'>
              <Button className='btn-img mb-5 h-3r' onClick={() => setImage(pictures[0])} ><img className='h-3r w-100pt' alt='img1' src={pictures[0]} /></Button><br />
              <Button className='btn-img mb-5 h-3r' onClick={() => setImage(pictures[1])} ><img className='h-3r w-100pt' alt='img1' src={pictures[1]} /></Button><br />
              <Button className='btn-img mb-5 h-3r' onClick={() => setImage(pictures[2])}><img className='h-3r w-100pt' alt='img1' src={pictures[2]} /></Button><br />
              <Button className='btn-img h-3r' onClick={() => setImage(pictures[3])}><img className='h-3r w-100pt' alt='img1' src={pictures[3]} /></Button>
            </div>
            <div className='jc-c flex' style={{ width: '80%' }}>
              <img className='h-12r my-5' src={image} alt='' />
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default withRouter(InfoUser)