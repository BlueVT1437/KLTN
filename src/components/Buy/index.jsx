import React from 'react'
import Button from 'react-bootstrap/Button'
import './index.scss'

function Buy() {
  return (
    <div className='buy'>
      <div className='buy-left'>
        <div className='name'>Kiet</div>
        <img src='/img/jordan.jpg' />
      </div>

      <div className='buy-right'>
        <p>SELECT YOUR SIZE</p>
        <button>item 1</button>
        <button>item 1</button>
        <button>item 1</button>
        <button>item 1</button>
        <button>item 1</button>

        <Button variant="success">NEXT</Button>{''}
        <Button variant="danger" >CANCEL</Button>{''}
      </div>
    </div>
  )
}

Buy.propTypes = {

}

export default Buy

