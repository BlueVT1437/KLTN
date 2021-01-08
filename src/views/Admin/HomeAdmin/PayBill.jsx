import React, { useEffect, useState } from 'react'

import { Col, Button, Row, Form, Modal } from 'react-bootstrap'

import { updateStatus } from '../../../lib/api'

import Paypal from '../../../components/Paypal'

const PallBill = (props) => {
  const { show, handleClose, orderId } = props
  const [status, setStatus] = useState(0)

  useEffect(() => {
    const data = { orderId, charge: 1 }
    if (status === 1) {
      updateStatus(data)
      handleClose()
    }
  }, [status])

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán người bán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Paypal getStatus={(status) => setStatus(status)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default PallBill