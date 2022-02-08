import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const ProductDetails = (props) => {
    const location = useLocation();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(async () => {
        const res = await fetch(`http://localhost:3000${location.pathname}`)
        const details = await res.json();
        setProductDetails(details);
        console.log(details);

    }, [location])

    const addToCart = (event) => {
        event.preventDefault();
        props.setCartProducts([...props.cartProducts, productDetails]);
    }
    
    return (
        <div>

        <Carousel width="50%">
            {productDetails?.images.map((img) => {
                return (<div>
                    <img src={img.url}/>    
                    </div>)
                }, )}
        </Carousel>
        <h1>{productDetails?.name}</h1>
        <h4>{productDetails?.price}</h4>
        <h4>{productDetails?.description}</h4>

        <button onClick={addToCart}>Add to Cart</button>
    
        </div>

    )
}

export default ProductDetails