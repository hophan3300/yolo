import React,{ useState, useEffect}from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

import CartItem from '../../components/CartItem'
import numberWithCommas from '../../untils/numberWithCommas'
import Helmet from '../../components/Helmet'
import {publicReq} from '../../services/api'

const Cart = () => {

   const KEY = 'pk_test_51K1KIaBBx0Nq24n6cjKVF4zXEAQErUx5klRpTfivYRrajgnAAB3muAUeC5fgzrTy7Mw60OXZ86gsUfVSA2J1wWmq00dJ7BIno1'

   const cart = useSelector(state => state.cart)

   
   const money = Math.floor(cart.total / 23000) + 1

   const [stripeToken, setStripeToken] = useState(null)

   const history = useHistory()

   const onToken = (token) => {
      setStripeToken(token)
   }

   useEffect(() => {
      const payment = async () => {
         try {
            const res = await publicReq.post("/stripe",{
               tokenId: stripeToken.id,
               amount: money*100
            })
            history.push('/success',{data: res.data})
         } catch{}
      }
      stripeToken && payment()
   },[stripeToken,history,money])
   

   const user = useSelector(state => state.user)


   return (
      <Helmet title="Giỏ hàng">
         <div className="cart">
            <div className="cart__title">
               <h2>Giỏ hàng của bạn</h2>
               <p>Có  sản phẩm trong giỏ hàng</p>
            </div>
            <div className="cart__list">
               {
                  cart.products.map((item, index) => (
                     <CartItem
                        item={item}
                        key={index}
                     />
                  ))
               }
            </div>
            <div className="cart__info">
               <div className="cart__info__left">
                  <textarea 
                     placeholder="Ghi chú"
                     rows={6}
                     cols={60}
                  ></textarea>
               </div>
               <div className="cart__info__right">
                  <div className="cart__total">
                     Tổng tiền: <span>{numberWithCommas(cart.total)}đ</span>
                  </div>
                  <div className="cart__btn">
                     <Link to="/catalog">
                        <button className="cart__btn__item">tiếp tục mua hàng</button>
                     </Link>
                     {user.currentUser && <StripeCheckout
                           name="Yolo"
                           billingAddress
                           shippingAddress
                           amount={money*100}
                           token={onToken}
                           stripeKey={KEY}
                           description={`Your total is $${money}`}
                     >
                        <button className="cart__btn__item">thanh toán</button>
                     </StripeCheckout>} 
                  </div>
               </div>
            </div>
         </div>
      </Helmet>
   )
}

export default Cart
