import React from 'react'

import { Link } from 'react-router-dom'


import Button from './Button'
import numberWithCommas from '../untils/numberWithCommas'

const ProductCard = props => {
   return (
      <div className="product-card">
         <Link to={`/catalog/${props.id}`}>
           <div className="product-card__image">
              <img src={props.img01} alt="" />
              <img src={props.img02} alt="" />
           </div>
           <h3 className="product-card__name">{props.title}</h3>
           <div className="product-card__price">
             {numberWithCommas(props.price)}đ
              <span className="product-card__price__old">
               <del>{numberWithCommas(props.price + 80000)}đ</del>
              </span>
           </div>
         </Link>
         <div className="product-card__btn">
            <Link to={`/catalog/${props.slug}`}>
               <Button
                  size="sm"    
                  icon="bx bx-cart"
                  animate={true}
               >
                  Chọn mua
               </Button>
            </Link>
         </div>
      </div>
   )
}



export default ProductCard
