import React from "react";
import { Route, Link} from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

const ProductCard = (props) => {

    console.log(props.product);
    return (
        <>
        <Grid item xs={6}>
            <Link style={{textDecoration: 'none'}} className="link" to={{
                    pathname: `/product/${props.product.id}`
                     }}>
            <Card variant='contained' sx={{justifyContent: 'center', margin: '5px', maxWidth:'345'}}>
                <img src={props.product.images[0].url} width="100%"/>
                <Typography textAlign="left" variant='body2' color="text.secondary" sx={{marginTop: '10px'}}>{props.product.name}</Typography> 
                <Typography textAlign="left" variant='body2' color="text.secondary" fontWeight={100} sx={{marginTop: '2px'}}>${props.product.price}</Typography> 
                <Grid container justifyContent='left' sx={{marginTop: '10px'}}>
                    {props.product.purchase_id? <Chip label="Sold Out" sx={{marginRight: '3px', fontWeight:'100', '&:hover': {bgcolor: "lightgray"}}}/> : <Chip label="Add to Cart" variant="outlined" sx={{fontWeight:'100', '&:hover': {bgcolor: "rgba(244, 162, 97, 0.9)", cursor: "pointer"}}}/>}
                </Grid>
            </Card>
            </Link>
        </Grid>
        </>
    )
}

export default ProductCard;