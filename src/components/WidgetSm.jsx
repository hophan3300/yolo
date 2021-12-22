import React from 'react'

import avartar from '../assets/images/avartar.gif'

const WidgetSm = () => {
   return (
      <div className="widget-sm">
         <span className="title">New Join Members</span>
         <ul className="list">
            <li className="item">
               <img src={avartar} alt="" className="image" />
               <div className="user">
                  <span className="user__name">John</span>
                  <span className="user__title">Software Engieer</span>
               </div>
               <button className="btn"><i className='bx bxs-low-vision' ></i>Display</button>
            </li>
            <li className="item">
               <img src={avartar} alt="" className="image" />
               <div className="user">
                  <span className="user__name">John</span>
                  <span className="user__title">Software Engieer</span>
               </div>
               <button className="btn"><i className='bx bxs-low-vision' ></i>Display</button>
            </li>
            <li className="item">
               <img src={avartar} alt="" className="image" />
               <div className="user">
                  <span className="user__name">John</span>
                  <span className="user__title">Software Engieer</span>
               </div>
               <button className="btn"><i className='bx bxs-low-vision' ></i>Display</button>
            </li>
            <li className="item">
               <img src={avartar} alt="" className="image" />
               <div className="user">
                  <span className="user__name">John</span>
                  <span className="user__title">Software Engieer</span>
               </div>
               <button className="btn"><i className='bx bxs-low-vision' ></i>Display</button>
            </li>
            <li className="item">
               <img src={avartar} alt="" className="image" />
               <div className="user">
                  <span className="user__name">John</span>
                  <span className="user__title">Software Engieer</span>
               </div>
               <button className="btn"><i className='bx bxs-low-vision' ></i>Display</button>
            </li>
         </ul>
      </div>
   )
}

export default WidgetSm
