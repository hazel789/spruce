import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box'
import { Typography, Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

const UserProfile = (props) => {
    
    const history = useHistory();
    const [userData, setUserData] = useState(null);
    const [userPurchases, setUserPurchases] = useState([]);
    useEffect(async () => {
        const localStorage = window.localStorage;
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            history.push('/login');
        } else {
            const res = await fetch('http://localhost:3000/user',  {
                headers: {
                'authorization': `Bearer ${accessToken}`
                }
            });
            if (res.status === 403) {
                alert("please login again");
                history.push('/login');
            }
            setUserData(await res.json());

            // fetch customer purchases
            const purchaseRes = await fetch('http://localhost:3000/purchase', {
                headers: {
                'authorization': `Bearer ${accessToken}`
                }
            });

            const purchases = await purchaseRes.json();

            for (let purchase of purchases) {
                purchase.created_at = purchase.created_at.substr(0, 10)
            }
            setUserPurchases(purchases);
        }
    }, [])

    const userPurchasesDisplay = userPurchases.map((purchase) => {
        console.log(purchase)
        return (
            <>
            <Grid wrap='nowrap' margin='20px' width='200p'>
            <Typography><b>Date of purchase:</b> {purchase.created_at}</Typography>
            <div>
            <Typography><b>Total amount purchased:</b> S${purchase.total_amount}</Typography>
            </div>
            </Grid>
            <div>
                {purchase.products.map((product)=> {
                    return (
                        <Grid container marginLeft='40px' marginBottom='10px'>
                            <Typography variant="body2">{product.name}</Typography>
                            <Typography marginLeft='20px' variant="body2">S${product.price}</Typography>
                        </Grid>
                    )
                })}

            </div>
            </>
        )
    })

    return (
        <Grid margin='20px'>
            <Avatar sx={{ bgcolor: deepOrange[500], margin: '10px'}}></Avatar>
            <Typography sx={{margin: '10px'}} variant="h5"><b>Hello, {userData?.name}</b></Typography>
            <Typography sx={{margin: '10px'}} variant="body2"><b>Email Address:</b> {userData?.email}</Typography>
            <Typography sx={{margin: '10px'}} variant="body2"><b>Address: </b> {userData?.address}</Typography>
            <Typography sx={{marginLeft: '10px', marginTop: '40px'}} variant='body1'><b>Purchase History</b></Typography>
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
            {userPurchasesDisplay}
            </Grid>
        </Grid>
    )
}

export default UserProfile;