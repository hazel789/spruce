import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

import { Grid, Typography, Button, Box} from "@mui/material";
import { Divider } from '@mui/material';

const Cart = (props) => {

    const history = useHistory();
    const [qrCode, setQrCode] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [accessToken, setAccessToken] = useState(null);

    const products = props.cartProducts?.map((product) => {

        const removeItem = () => {
            let newCartProducts = props.cartProducts.filter(product => product.id !== product.id)
            props.setCartProducts(newCartProducts)
        }

        return (
            <Grid container>
                <img width='20%' src={product.images[0].url}/>
                <Typography sx={{marginLeft: '15px'}}>{product.name}</Typography>
                <Typography sx={{marginLeft: '50px'}}>S${product.price}</Typography>
                <Grid container justifyContent='right' marginRight="80px" marginBottom='20px'>
                    <Button sx={{color: 'orange', '&:hover': {backgroundColor: 'rgba(244, 162, 97, 0.1)'}}} onClick={removeItem}>Remove Item</Button>
                </Grid>
            </Grid>
        )
    })

    useEffect(async () => {
        const localStorage = window.localStorage;
        const accessToken = localStorage.getItem('accessToken');
        // check if user is logged in 
        const res = await fetch('http://localhost:3000/checklogin',{
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        })
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
        } else {
            setAccessToken(accessToken);
        }
    }
       
    , [])
    const redirectToLogin = (event) => {
        event.preventDefault();
        history.push('/login');
    }

    useEffect(() => {
        let totalAmount = 0;
        for (const product of props.cartProducts) {
            totalAmount += product.price;
        }
        setTotalAmount(totalAmount);
    }, [props.cartProducts])

    const handleCheckout = async (event) => {
        event.preventDefault();
        const url = `https://sgqr.fullstacksys.com/paynow?mobile=96561790&uen=&editable=0&amount=${totalAmount}&expiry=2023/01/1%2001:02&ref_id=&company=`
        const res = await fetch(url);
        setQrCode(URL.createObjectURL(await res.blob()));
        console.log(props.cartProducts);
        await fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({products: props.cartProducts})
        });
    }
    const button = accessToken?  <Button onClick={handleCheckout}>Checkout</Button> : <Button variant='contained' onClick={redirectToLogin} sx={{bgcolor: 'rgba(244, 162, 97, 0.9)', '&:hover': {backgroundColor: 'orange'}}}> Please log in to check out </Button>

    return (
        <Grid container justifyContent='left' marginLeft='20px' marginTop='40px'>
            <Grid container marginBottom='50px'>
                <Typography variant='h5' fontWeight='500'>
                My Shopping Cart
                </Typography>
            </Grid>
           {products}
           {/* <Box sx={{borderBottom: '5px'}}>
               <hr style={{color: 'black'}} />
           </Box> */}
           <Grid sx={{
                boxShadow: 3,
                width: '90%',
                // height: '5rem',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                p: 2,
                m: 1,
                borderRadius: 2,
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '700',
            }}>
                <Typography variant='body1' fontWeight='500' sx={{marginTop: '10px'}}>ORDER SUMMARY </Typography>
                <Typography>S${totalAmount}</Typography>
            
                <Grid container marginTop='40px'>
                    <Typography>Please scan the QR code below to pay.</Typography>
                    <img src={qrCode} />
                </Grid>
                <Grid container marginTop='10px'>
                    {button}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Cart