import React from 'react'
import PropTypes from 'prop-types'
import { Table, Card, Button } from 'react-bootstrap'
import './index.scss'

function Order(props) {
  return (
    <Card className='order'>
      <Card.Header>QUẢN LÝ USER</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive click size="sm">
          <thead>
            <tr>
              <th style={{width: '5%'}}>ID</th>
              <th style={{width: '15%'}}>Name seller</th>
              <th style={{width: '15%'}}>Name customer</th>
              <th style={{width: 'auto'}}>Name goods</th>
              <th style={{width: '30%'}}>Address</th>
              <th style={{width: '15%'}}>Phone number</th>
              <th style={{width: '5%'}}>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
                ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
              </td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
        <Button variant='outline-dark' type='button'>CANCEL TRANSFER</Button>
        <Button variant='outline-danger' type='button'>RECEIVE BACK</Button>
        <Button variant='outline-success' type='button'>ACCEPT</Button>
      </Card.Body>
    </Card>
  )
}

export default Order

