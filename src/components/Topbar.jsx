import React from 'react'
import { Link} from 'react-router-dom'
import avartar from '../assets/img/avartar.gif'

const Topbar = () => {
   return (
      <div className="topbar">
         <div className="topbar__wrapper">
            <div className="left">
              <Link to="/"><div className="logo">Yolo Admin</div></Link>
            </div>
            <div className="right">
               <div className="icon">
                  <i className='bx bx-bell'></i>
               </div>
               <div className="icon">
                  <i className='bx bx-world'></i>
               </div>
               <div className="icon">
               <i className='bx bxs-brightness'></i>
               </div>
               <img src={avartar} className="avartar" alt="" />
            </div>
         </div>
      </div>
   )
}

export default Topbar
