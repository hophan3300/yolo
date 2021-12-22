import React,{ useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import numberWithCommas from '../../untils/numberWithCommas'
import {allProducts} from '../../redux/apiCalls'

const Search = () => {
   
   const [key, setKey] = useState('')
   const [list, setList] = useState([])

   const dispatch = useDispatch()


   useEffect(() => {
     allProducts(dispatch)
   }, [dispatch])

   const products = useSelector(state => state.products.allProducts)

   useEffect(() => {
      const newProduct = products.filter((item) => item.title.toLowerCase().search(key.toLowerCase()) !== -1)
      setList(newProduct)
   }, [key,products])

   
   const handleChange = (e) => {
      setKey(e.target.value)
   }


   return (
      <div className="search">
         <div className="search__input">
            <input 
               type="text" 
               placeholder="Tìm kiếm sản phẩm" 
               onChange={handleChange}
            />
            <i className='bx bx-search'></i>
         </div>
         <div className="search__content">
           {key && <ListItemSearch list={list}/>}
         </div>
      </div>
   )
}

const ListItemSearch = ({list}) => {
   return(
      <>
         {
            list.map((item, index) => (
               <Link key={index} to={`/catalog/${item._id}`}>
                <div className="list__item">
                  <div className="list__item__left">
                     <h2>{item.title}</h2>
                     <p>{numberWithCommas(item.price)}đ</p>
                  </div>
                  <div className="list__item__right">
                     <img src={item.img01} alt="" />
                  </div>
                </div>
               </Link>
            ))
         }
      </>
   )
}

export default Search
