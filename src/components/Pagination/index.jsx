import React from 'react'
import { Pagination } from 'react-bootstrap'
import './index.scss'

const PaginationBasic = (props) => {
  const { currentPage, limit, onPageChange, total } = props

  const MaxPage = (total, limit) => {
    if(!MaxPage.cache){
      MaxPage.cache = {}
    }
    
    let key= `${total}_${limit}`
    // let synmertricKey= `${limit}_${total}`
    if(MaxPage.cache[key]) return MaxPage.cache[key]
    // if(MaxPage.cache[synmertricKey]) return MaxPage.cache[synmertricKey]

    const totalPage = Math.ceil(total/limit)
    MaxPage.cache[key]= totalPage
    return totalPage
  }

  let items = [];
  // let totalPage = Math.ceil(total/limit)

  for (let number = 1; number <= MaxPage(total, limit); number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)} >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className='pl-5'>
      <Pagination>{items}</Pagination>
    </div>
  )
}
export default PaginationBasic

