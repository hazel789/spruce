import React from "react";

import './productcard.css'

const ProductCard = (props) => {

    console.log(props.product);
    return (
        <div className="productcard">
            <div>{props.product.name}</div> 
            <img src={props.product.images[0].url}/>
        </div>
    )
}

export default ProductCard;