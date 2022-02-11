import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
        console.log(props.cartProducts);
        
        const productInCart = props.cartProducts.find((product) => product.id === productDetails.id)
        if (!productInCart) {
            props.setCartProducts([...props.cartProducts, productDetails]);
        }
    }
    
    return (
        <Grid container justifyContent='center'>
        <Grid container justifyContent='right'>
        <Carousel width="100%" emulateTouch='true' autoFocus>
            {productDetails?.images.map((img) => {
                return (
                    <div>
                    <img src={img.url}/>    
                    </div>)
                }, )}
        </Carousel>
        </Grid>
        <Grid container justifyContent='left'>
        <Typography variant='h6' fontWeight='500' sx={{marginLeft: '15px', marginBottom: '15px'}}>{productDetails?.name}</Typography><br/>
        </Grid>
        <Grid container justifyContent='left' marginLeft="15px">
        <Typography variant='body2' marginTop="0px" fontWeight='500'>S${productDetails?.price}</Typography>
        </Grid>
        <Grid container justifyContent='left' marginLeft="15px">
        <Typography variant='body2' marginTop='15px'>size: {productDetails?.size}</Typography>
        </Grid>
        <Typography variant='body2' sx={{margin: '15px'}} fontWeight='100'>{productDetails?.description}</Typography>

        <Grid container justifyContent='left' margin='15px'>
        {!productDetails?.purchase_id ? <Button variant='contained' sx={{bgcolor: 'rgba(244, 162, 97, 0.9)', '&:hover': {backgroundColor: 'orange'}}} onClick={addToCart}>Add to Cart</Button> : <Button>Sold out!</Button> }
        </Grid>
        </Grid>

    )
}

export default ProductDetails