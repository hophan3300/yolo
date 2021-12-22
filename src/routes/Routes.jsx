import React from 'react'
import {Switch, Route} from "react-router-dom";

import Home from '../pages/Home/Home'
import Catalog from '../pages/Catalog/Catalog'
import Product from '../pages/Product/Product'
import Cart from '../pages/Cart/Cart'
import Register from '../pages/Login/Register';
import Login from '../pages/Login/Login';
import Search from '../pages/Search/Search'
import Success from '../pages/Success/Success';


const Routes = () => {

    return (
      <Switch>
         <Route path='/' exact component={Home}/>
         <Route path='/catalog/:id' component={Product}/>
         <Route path='/catalog' component={Catalog}/>
         <Route path='/cart' component={Cart}/>
         <Route path='/register' component={Register}/>
         <Route path='/login' component={Login}/>
         <Route path='/search' component={Search}/>
         <Route path='/success' component={Success}/>
       </Switch>
    )
}

export default Routes
