import React from 'react'
import { Button,Modal } from 'react-bootstrap'
import { withRouter } from "react-router"

function Paying(props) {
  const { show, handleClose, history } = props

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chúc mừng!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn đã đấu giá thành công món hàng~~~</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> history.push('/')}>
            Thank you
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default withRouter(Paying)