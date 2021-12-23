import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
   {
      title: {type: String, unique: true, required: true},
      img01:{type: String, required: true},
      img02:{type: String, required: true},
      price: {type: String, required: true },
      categorySlug: {type: String, required: true},
      colors: {type:Array},
      size: {type:Array},
      slug:{type:String, required: true},
      description:{type: String},
      inStock:{type: Boolean, default:true}
   },
   { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)
export default Product