import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import numberWithCommas from '../untils/numberWithCommas'
import {updateProduct, removeProduct} from '../redux/cartRedux'



const CartItem = ({item}) => {

    const dispatch = useDispatch()


    const handleUpdate = (update) => {
        if(update === 'minus'){
            dispatch(updateProduct({
                ...item,
                quantity: item.quantity - 1 === 0 ? 1 : item.quantity - 1
            }))
        }
        if(update === 'plus'){
            dispatch(updateProduct({
                ...item,
                quantity: item.quantity + 1
            }))
        }
    }
   
    const handleRemove = () => {
        dispatch(removeProduct(item))
    }

    return (
        <div className="cart__item">
            <div className="cart__item__left">
                <div className="cart__item__image">
                     <Link to={`/catalog/${item._id}`}>
                        <img src={item.img01} alt="" />
                     </Link>
                </div>
                <div className="cart__item__info">
                    <div className="cart__item__info__name">
                        <Link to={`/catalog/${item._id}`}>
                            {item.title}
                        </Link>
                    </div>
                    <div className="cart__item__info__price">
                        {numberWithCommas(item.price)}
                    </div>
                    <div className="cart__item__info__category">
                        <div 
                            className="cart__item__info__color"
                            style={{color: `${item.colors}`}}
                        >
                            <i className='bx bxs-circle' ></i>
                        </div>
                        <div className="cart__item__info__size">{item.size}</div>
                    </div>
                        <div className="cart__item__info__quantity">
                            <div 
                                className="cart__item__info__quantity__btn" 
                                onClick={() => handleUpdate('minus')}
                            >
                                <i className="bx bx-minus"></i>
                            </div>
                            <div className="cart__item__info__quantity__input">
                                {item.quantity}
                            </div>
                            <div 
                                className="cart__item__info__quantity__btn" 
                                onClick={() => handleUpdate('plus')}
                            >
                                <i className="bx bx-plus"></i>
                            </div>
                        </div>
                    
                </div>
            </div>      
            <div className="cart__item__right">
                <div className="cart__item__del" onClick={handleRemove}>
                    <i className='bx bx-trash'></i>
                </div>
                <div className="cart__item__price">
                    {numberWithCommas(item.price * item.quantity)}
                </div>
            </div>
        </div>
    )
}



export default CartItem
