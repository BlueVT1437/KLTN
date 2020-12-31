import React, {useState} from 'react'
import { Toast, Button } from 'react-bootstrap'

const Messages = (props) => {
  const {fail} = props
  const [showA, setShowA] = useState(false)

  const toggleShowA = () => setShowA(!showA);
  (fail == true) ?? setShowA(!showA) 

  return (
    <Toast show={showA} onClose={toggleShowA}>
      <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
        <strong className="">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  )
}
export default Messages