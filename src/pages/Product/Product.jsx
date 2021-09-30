import React, { useEffect } from 'react'
import productData from '../../assets/fake-data/Product'
import Helmet from '../../components/Helmet'
import {Section, SectionBody, SectionTitle} from '../../components/Section'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import ProductView  from '../../components/ProductView'

const Product = (props) => {

   const product = productData.getProductBySlug(props.match.params.slug)

   const relatedProduct = productData.getProducts(8)

   useEffect(() => {
      window.scrollTo(0,0)
   },[product])

   return (
      <Helmet title={product.title}>
        <Section>
           <SectionBody>
             <ProductView product={product}/>
           </SectionBody>
        </Section>
        <Section>
           <SectionTitle>
               khám phá thêm
           </SectionTitle>
           <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
               {
                  relatedProduct.map((item, index) => (
                     <ProductCard
                        key={index}
                        name={item.title}
                        img01={item.image01}
                        img02={item.image02}
                        price={Number(item.price)}
                        slug={item.slug}
                     />
                  ))
               }
               </Grid>
           </SectionBody>
        </Section>
      </Helmet>
   )
}

export default Product
