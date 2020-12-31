import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './index.scss';

const Loading = () => {
  return (
    <section>
      <div className='circle'>
        <Skeleton circle height={80} width={80} />
      </div>
      <br/>
      <h2>
        <Skeleton duration={1} height={30} width={300}/>
      </h2>
      <ul>
        {Array(8).fill().map((items, index) => (
          <li className='card' key={index}>
            <h4 className='card-title'>
              <Skeleton height={150} width={220} />
              <Skeleton height={30} width={'70%'} />
            </h4>
            <div>
              <div className='card-descripton'>
                <p><Skeleton height={20} width={`50%`} /></p>
                <span><Skeleton height={20} width={`50%`} /></span>
              </div>
              <div>
                <Skeleton height={10} width={`10%`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Loading;