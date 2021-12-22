import React from 'react'

import avartar from '../assets/images/avartar.gif'

const WidgetLg = () => {

   const Button = ({type}) => {
      return(
         <button className={`btn ${type}`}>{type}</button>
      )
   }

   return (
      <div className="widget-lg">
         <h3 className="title">Lasted Transactions</h3>
         <table>
            <tbody>
            <tr>
               <th>Customers</th>
               <th>Date</th>
               <th>Amount</th>
               <th>Status</th>
            </tr>
            <tr>
               <td className="user">
                  <img src={avartar} alt="" />
                  <span>Join</span>
               </td>
               <td className="date">2 Jun 2021</td>
               <td className="amount">$20</td>
               <td className="status"><Button type="Approved" /></td>
            </tr>
            <tr>
               <td className="user">
                  <img src={avartar} alt="" />
                  <span>Join</span>
               </td>
               <td className="date">2 Jun 2021</td>
               <td className="amount">$20</td>
               <td className="status"><Button type="Declined" /></td>
            </tr>
            <tr>
               <td className="user">
                  <img src={avartar} alt="" />
                  <span>Join</span>
               </td>
               <td className="date">2 Jun 2021</td>
               <td className="amount">$20</td>
               <td className="status"><Button type="Pending" /></td>
            </tr>
            <tr>
               <td className="user">
                  <img src={avartar} alt="" />
                  <span>Join</span>
               </td>
               <td className="date">2 Jun 2021</td>
               <td className="amount">$20</td>
               <td className="status"><Button type="Approved" /></td>
            </tr>
            </tbody>
         </table>
      </div>
   )
}

export default WidgetLg
