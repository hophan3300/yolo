import React,{ useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import colors from '../../assets/fake-data/ProductColor'
import sizes from '../../assets/fake-data/ProductSize'
import category from '../../assets/fake-data/Category'
import { allProducts } from '../../redux/apiCalls'

const Catalog = () => {

   const [filter, setFilter] = useState({})
   const [sort, setSort] = useState("")
   const [filterProduct, setFilterProduct] = useState([])
   const [newProducts, setNewProducts] = useState([])
   
   const dispatch = useDispatch()

   const handleFilter = (e) => {
      setFilter({
         ...filter,
         [e.target.name]: e.target.value
      })
   }

   useEffect(() => {
     allProducts(dispatch)
   }, [dispatch])

   const products = useSelector(state => state.products.allProducts)

   useEffect(() => {
      setNewProducts(products.map((item, index) => ({...item, key: index})))
   },[products])
   
   useEffect(() => {
      setFilterProduct(newProducts.filter(item => 
      Object.entries(filter).every(([key,value]) => value === "" ? item[key] : item[key].includes(value))))
   }, [filter,newProducts])

  
   useEffect(() => {
      if(sort === 'popular'){
         setFilterProduct(item => [...item].sort((a,b) => a.key - b.key))
      }
      if(sort === "incr"){
         setFilterProduct(item => [...item].sort((a, b) => a.price - b.price))
      }if(sort === "descr"){
         setFilterProduct(item => [...item].sort((a,b) => b.price - a.price))
      }
   }, [sort,filter])


   return (
      <div className="catalog">
         <div className="catalog__top">
            <div className="catalog__top__content">
               <h2>lọc sản phẩm:</h2>
               <select name="categorySlug" onChange={handleFilter}>
                     <option value="">Phân loại</option>
                     {
                        category.map((item, index) => (
                           <option 
                              key={index} 
                              value={item.categorySlug}
                           >{item.display}
                           </option>
                        ))
                     }
               </select>
               <select name="colors" onChange={handleFilter} >
                  <option value="">Màu sắc</option>
                  {
                     colors.map((item, index) => (
                        <option key={index} value={item.color}>{item.display}</option>
                     ))
                  }
               </select>
               <select name="size" onChange={handleFilter}>
                  <option value="">Kích thước</option>
                  {
                     sizes.map((item, index) => (
                        <option key={index} value={item.size}>{item.display}</option>
                     ))
                  }
               </select>
            </div>
            <div className="catalog__top__content">
               <h2>Sắp xếp:</h2>
               <select name="sort" onChange={(e) => setSort(e.target.value) }>
                  <option value="popular">Phổ biến nhất</option>
                  <option value="incr">Giá từ thấp đến cao</option>
                  <option value="descr">Giá từ cao đến thấp</option>
               </select>
            </div>
         </div>
         <div className="catalog__content">
            <Grid 
               col={4}
               mdCol={2}
               smCol={1}
               gap={10}
            >
               { filterProduct?.map((item, index) => (
                  <ProductCard
                        key={index}
                        title={item.title}
                        img01={item.img01}
                        img02={item.img02}
                        price={Number(item.price)}
                        slug={item.slug}
                        id={item._id}
                     />
               ))}
            </Grid>
         </div>
      </div>
   )
}

export default Catalog
