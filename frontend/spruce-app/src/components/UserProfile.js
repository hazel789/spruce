import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box'
import { Typography } from "@mui/material";

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
        <Box sx={{bgcolor: "#f7ede2"}}>
            <Typography variant="h3">Hello, {userData?.name}</Typography>
            <Typography variant="h6">Email Address: {userData?.email}</Typography>
            <Typography variant="h6">{userData?.address}</Typography>
            <Typography>Purchase History</Typography>
            {userPurchasesDisplay}
        </Box>
    )
}

export default UserProfile;