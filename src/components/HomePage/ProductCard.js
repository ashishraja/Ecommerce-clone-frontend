import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";



const ProductCard = ({product}) => {

  const options = {
    edit:false,
    activeColor:"tomato",
    color:"rgba(20,20,20,.1)",
    size:window.innerWidth < 600 ? 10 : 20,
    value:product.ratings,
    isHalf:true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product && product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /> 
            <span className="productCardSpan">({product.noOfReview} Reviews)</span>
        </div>
        <span>Rs {product.price}</span>
    </Link>
  )
}

export default ProductCard