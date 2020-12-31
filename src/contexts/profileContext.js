import React, { createContext, useState } from 'react'

export const ProfileContext = createContext()

function Index(props) {
  const [defaultOrder, setDefaultOrder] = useState({
    address: {id: '123'},
    order: {id: '321'}
  })

  const contextValue = {
    defaultOrder,
    setDefaultOrder
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {props.children}
    </ProfileContext.Provider>
  )
}
export default Index