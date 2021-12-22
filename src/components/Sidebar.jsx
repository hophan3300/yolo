import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
   return (
      <div className="sidebar">
         <div className="sidebar__wrapper">
            <div className="menu">
               <h3 className="title">Dashboard</h3>
               <ul className="list">
                  <Link to="/">
                     <li className="item active"><i className='bx bx-home'></i>Home</li>
                  </Link>
                  <li className="item "><i className='bx bx-line-chart'></i>Analytic</li>
                  <li className="item "><i className='bx bx-trending-up'></i>Sales</li>
               </ul>
            </div>
            <div className="menu">
               <h3 className="title">Quick Menu</h3>
               <ul className="list">
                 <Link to="/users">
                     <li className="item"><i className='bx bx-user' ></i>Users</li>
                 </Link>
                  <Link to="products">
                     <li className="item "><i className='bx bx-store'></i>Products</li>
                  </Link>
                  <li className="item "><i className='bx bx-dollar' ></i>Transactions</li>
                  <li className="item "><i className='bx bxs-report'></i>Reports</li>
               </ul>
            </div>
            <div className="menu">
               <h3 className="title">Notifications</h3>
               <ul className="list">
                  <li className="item"><i className='bx bx-mail-send'></i>Mails</li>
                  <li className="item "><i className='bx bx-repost'></i>Feedback</li>
                  <li className="item "><i className='bx bx-message-dots'></i>Messages</li>
               </ul>
            </div>
            <div className="menu">
               <h3 className="title">Staff</h3>
               <ul className="list">
                  <li className="item"><i className='bx bx-briefcase-alt-2'></i>Managers</li>
                  <li className="item "><i className='bx bx-line-chart'></i>Analytic</li>
                  <li className="item "><i className='bx bxs-report'></i>Reports</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Sidebar
