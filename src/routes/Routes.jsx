import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home/Home'
import Catalog from '../pages/Catalog/Catalog'
import Product from '../pages/Product/Product'
import Cart from '../pages/Cart/Cart'


const Routes = () => {
    return (
      <Switch>
         <Route path='/' exact component={Home}/>
         <Route path='/catalog/:slug' component={Product}/>
         <Route path='/catalog' component={Catalog}/>
         <Route path='/cart' component={Cart}/>
       </Switch>
    )
}

export default Routes
