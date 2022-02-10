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
        <Grid item xs={6}>
            <Link style={{textDecoration: 'none'}} className="link" to={{
                    pathname: `/product/${props.product.id}`
                     }}>
            <Card variant='outlined' sx={{justifyContent: 'center', margin: '5px', maxWidth:'345'}}>
                <img src={props.product.images[0].url} width="100%"/>
                <Typography textAlign="center" fontSize='10' color="text.secondary">{props.product.name}</Typography> 
                <Typography>
                {props.product.purchase_id? <Chip label="Sold Out" sx={{margin: '3px'}}/> : <Chip label="Add to Cart" variant="outlined"/>}
                </Typography>
            </Card>
            </Link>
        </Grid>
    )
}

export default ProductCard;