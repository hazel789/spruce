import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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

    return (
        <div>
            <h1>{userData?.name}</h1>
            <h1>{userData?.email}</h1>
            <h1>{userData?.address}</h1>
        </div>
    )
}

export default UserProfile;