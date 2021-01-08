import React, { useRef, useEffect } from 'react'

export default function Paypal(props) {
  const { getStatus } = props
  const paypal = useRef()
  const buynow = ((Math.trunc(localStorage.getItem('buynow') / 23000) + 1) < 20) ? 20 : (Math.trunc(localStorage.getItem('buynow') / 23000) + 1)

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions, error) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "Pay for product auction sucessful...",
              amount: {
                currency_code: "USD",
                value: buynow
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        if (buynow != 20) {
          getStatus(() => (order.status == 'COMPLETED') ? 1 : 0)
          window.alert('thanh toán thành công!!!')
        }
        else{
          getStatus(() => (order.status == 'COMPLETED') ? 1 : 0)
          window.alert('đặt cọc thành công!!!')
        }
      },
      onError: (err) => {
        console.log(err)
      }
    }).render(paypal.current)
  })
  return (
    <div>
      <div className='flex jc-c' ref={paypal}></div>
    </div>
  )
}
