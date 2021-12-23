import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'


import Button from '../../components/Button'
import {publicReq} from '../../services/api'
import numberWithCommas from '../../untils/numberWithCommas'
import {addProduct} from '../../redux/cartRedux'


const Product = () => {

   const [product, setProduct] = useState([])
   const params = useParams()
   const [previewImg, setPreviewImg] = useState()
   const [quantity, setQuantity] = useState(1)
   const [colors, setColor] = useState('')
   const [size, setSize] = useState('')
   const dispatch = useDispatch()
   const history = useHistory()

   useEffect(() => {
     let isMounted = true
     const getProducts = async () => {
        const res = await publicReq.get(`/products/find/${params.id}`)
        return res.data
     }
     getProducts().then(data => {
        if(isMounted){
         setProduct(data)
         setPreviewImg(data.img01)
        }
     })
     return () => { isMounted = false }
   }, [params])
   
   const checked = () => {
      if(colors === '') {
         alert("ban chua chon mau")
         return false
      }
      if(size === ''){
         alert("ban chua chon kich thuoc")
         return false
      }
      return true
   }
   
   const addToCart = () => {
      if(checked()){
         dispatch(addProduct({...product, size, colors, quantity}))
         setColor('')
         setSize('')
         setQuantity(1)
      }
   }

   const buyNow = () => {
      if(checked()){
         addToCart()
         history.push("/cart")
      }
   }

   return (
      <>
      <div className="product__top">
         <Link to="/">Trang chủ</Link>
         <Link to="/catalog">Sản phẩm</Link>
         <p>{product.title}</p>
      </div>
      <div className="product">
         <div className="product__left">
              <div className="product__left__small">
               <img 
                  className={previewImg === product.img01 ? 'active' : '' } 
                  src={product.img01} alt="" 
                  onClick={() => setPreviewImg(product.img01)} 
               />
               <img 
                  className={previewImg === product.img02 ? 'active' : '' }
                  src={product.img02} alt=""
                  onClick={() =>setPreviewImg(product.img02)} 
               />
              </div>
              <div className="product__left__img">
               {previewImg && <img src={previewImg} alt="" />}
              </div>
         </div>
         <div className="product__right">
            <div className="product__right__title">
               <h2>{product.title}</h2>
            </div>
            {product.price && <div className="product__right__price">{numberWithCommas(product.price)}đ</div>}
            <div className="product__right__colors">
               Màu sắc
               {
                  product.colors &&  product.colors.map((item, index) => (
                     <i onClick={() => setColor(item)} 
                        key={index} style={{color: `${item}`}}   
                        className={`bx bxs-circle ${item === colors ? 'active' : ''}`}></i>
                  ))
               }
            </div>
            <div className="product__right__size">
               Kích thước
               {
                  product.size &&  product.size.map((item, index) => (
                     <span    
                        onClick={() => setSize(item)} 
                        key={index}
                        className={item === size ? 'active' : ''}
                     >{item}
                     </span>
                  ))
               }  
            </div>
            <div className="product__right__quantity">
               <div 
                  className="product__right__quantity__btn"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
               ><i className="bx bx-minus"></i>
               </div>
               <div className="product__right__quantity__input">{quantity}</div>
               <div 
                  className="product__right__quantity__btn"
                  onClick={() => setQuantity(quantity + 1)}
               ><i className="bx bx-plus"></i>
               </div>
            </div>
            <Button size="md" onClick={addToCart}>thêm vào giỏ hàng</Button>
            <Button onClick={buyNow} size="md">Mua ngay</Button>
         </div>
      </div>
      </>
   )
}

export default Product
