import React, { useEffect, useState } from "react";
import { Route, Link} from 'react-router-dom';
import ProductCard from "./ProductCard";
import ProductDetails from './ProductDetails'
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';


const Display = (props) => {
    const location = useLocation();

    const fetchData = async (url) => {
        const resp = await fetch(url)
        props.setFetchData({fetchData: false})
        
        const products = await resp.json();
        props.setProductsData(products);
    }

    useEffect(() => {
        let queryURL = 'http://localhost:3000/product/search?'
        if (!props.fetchData?.fetchData) {
            return; 
        }
        if (props.fetchData.is_new) {
            queryURL += '&is_new=true'
        }
        if (props.fetchData.is_featured) {
            queryURL += '&is_featured=true'
        }
        fetchData(queryURL)
        
    }, [props.fetchData, location])

    useEffect(() => {
        if (props.fetchData.fetchData) {
            let queryURL = 'http://localhost:3000/product/search'
            fetchData(queryURL)
        }

    }, [])

    let display = props.productsData.map((product) => {
        return (
            <>
                <ProductCard product={product}/>
            </>
        )
    })

    return (

        <>
         <Box sx={{bgcolor: "white"}}>
            <Box sx={{ width: '100%' }}>
                <Grid wrap='wrap' container direction="row" columns={14} justifyContent="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {display}
                </Grid>
            </Box>
        </Box>
        </>

        )
    }

export default Display