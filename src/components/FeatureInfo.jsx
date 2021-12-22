import React from 'react'

const FeatureInfo = () => {
   return (
      <div className="feature">
         <div className="feature__item">
            <span className="title">Revanue</span>
            <div className="money__container">
               <span className="money">$2,415</span>
               <span className="money__rate">-11.4<i className='bx bx-down-arrow-alt'></i></span>
            </div>
            <span className="sub">Compared to last month</span>
         </div>
         <div className="feature__item">
            <span className="title">Sales</span>
            <div className="money__container">
               <span className="money">$4,1</span>
               <span className="money__rate">-1.4<i className='bx bx-down-arrow-alt'></i></span>
            </div>
            <span className="sub">Compared to last month</span>
         </div>
         <div className="feature__item">
            <span className="title">Cost</span>
            <div className="money__container">
               <span className="money">$2,25</span>
               <span className="money__rate">+2.1<i className='bx bx-up-arrow-alt up'></i></span>
            </div>
            <span className="sub">Compared to last month</span>
         </div>
      </div>
   )
}

export default FeatureInfo
