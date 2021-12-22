import React from 'react'

import FeatureInfo from '../../components/FeatureInfo'
import Chart from '../../components/Chart'
import {userData} from '../../assets/fake-data/data'
import WidgetLg from '../../components/WidgetLg'
import WidgetSm from '../../components/WidgetSm'

const AdminHome = () => {
   return (
      <div className="home">
         <FeatureInfo/>
         <Chart data={userData} title="Users Analytics" grid dataKey="Active Users"/>
         <div className="home__widget">
            <WidgetSm/>
            <WidgetLg/>
         </div>
      </div>
   )
}

export default AdminHome
