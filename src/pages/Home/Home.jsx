import React,{ useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import Slide from '../../components/Slide'
import Helmet from '../../components/Helmet'
import slideData from '../../assets/fake-data/SlideData'
import { Section , SectionBody, SectionTitle} from '../../components/Section'
import PolicyCard from '../../components/PolicyCard'
import Policy from '../../assets/fake-data/Policy'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import banner from '../../assets/images/banner.png'
import { allProducts } from '../../redux/apiCalls'

const Home = () => { 

   const dispatch = useDispatch()

   useEffect(() => {
     allProducts(dispatch)
   }, [dispatch])

   const products = useSelector(state => state.products.allProducts)

   const getProductsRandom = (count) => {
      const newProduct = [...products].sort(() => Math.random() - 0.5)
      return newProduct.slice(0,count)
  }

   return (
      <Helmet title="Trang chủ">
         <Slide 
            data={slideData}
            control={true}
            auto={true}
            timeOut={5000}
         />
         <Section>
          <SectionBody>
            <Grid 
               col={4}
               mdCol={2}
               smCol={1}
               gap={20}
            >
               { Policy.map((item, index) => (
                  <Link to="/policy" key={index}>
                   <PolicyCard 
                     name={item.name} 
                     description={item.description}
                     icon={item.icon}
                   />
                  </Link>
               ))}
            </Grid>
          </SectionBody>
         </Section>
         <Section>
            <SectionTitle>
               top sản phẩm bán chạy trong tuần
            </SectionTitle>
            <SectionBody>
            <Grid 
               col={4}
               mdCol={2}
               smCol={1}
               gap={20}
            >
               {
                 getProductsRandom(4).map((item, index) => (
                     <ProductCard
                        key={index}
                        title={item.title}
                        img01={item.img01}
                        img02={item.img02}
                        price={Number(item.price)}
                        slug={item.slug}
                        id={item._id}
                     />
                  ))
               }
            </Grid>
            </SectionBody>
         </Section>
         <Section>
            <SectionBody>
               <Link to="/catalog">
                  <img src={banner} alt="" />
               </Link>
            </SectionBody>
         </Section>
         <Section>
            <SectionTitle>
               Các sản phẩm khác
            </SectionTitle>
            <SectionBody>
            <Grid 
               col={4}
               mdCol={2}
               smCol={1}
               gap={20}
            >
               { 
                  getProductsRandom(8).map((item, index) => (
                     <ProductCard
                        key={index}
                        title={item.title}
                        img01={item.img01}
                        img02={item.img02}
                        price={Number(item.price)}
                        slug={item.slug}
                        id={item._id}
                     />
                  ))
               }
            </Grid>
            </SectionBody>
         </Section>
      </Helmet>
   )
}

export default Home
