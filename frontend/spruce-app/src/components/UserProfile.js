import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box'
import { Typography } from "@mui/material";
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
            setUserPurchases(await purchaseRes.json());
        }
    }, [])

    const userPurchasesDisplay = userPurchases.map((purchase) => {
        return (
            <div>
                {purchase.products.map((product)=> {
                    return (
                        <div>
                            <Typography variant="h6">{product.name}</Typography>,
                            <Typography variant="h6">{product.price}</Typography>
                        </div>
                    )
                })}
                {purchase.total_amount},
                {purchase.created_at}
            </div>
        )
    })

    return (
        <Box>
            <Avatar sx={{ bgcolor: deepOrange[500], margin: '10px'}}></Avatar>
            <Typography sx={{margin: '10px'}} variant="h5"><b>Hello, {userData?.name}</b></Typography>
            <Typography sx={{margin: '10px'}} variant="body2"><b>Email Address:</b> {userData?.email}</Typography>
            <Typography sx={{margin: '10px'}} variant="body2"><b>Address: </b> {userData?.address}</Typography>
            <Typography sx={{marginLeft: '10px', marginTop: '20px'}} variant='body1'><b>Purchase History</b></Typography>
            {userPurchasesDisplay}
        </Box>
    )
}

export default UserProfile;