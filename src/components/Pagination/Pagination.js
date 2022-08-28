import React from 'react'

const PER_PAGE_ITEM = 30

const Pagination = ({currentPage,totalCount, onHandlePage}) => {

    const disableNext = Math.ceil(totalCount / PER_PAGE_ITEM)

  return (
    <div className='mb-4'>
        <button disabled={currentPage < 2} onClick={() => onHandlePage(currentPage - 1)}>Previous</button>
        <span className='mx-3'>{currentPage}</span>
        <button disabled={currentPage >= disableNext} onClick={() => onHandlePage(currentPage + 1)}>Next</button>
    </div>
  )
}

export default Pagination