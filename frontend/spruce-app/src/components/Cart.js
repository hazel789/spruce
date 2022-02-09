import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";


const Cart = (props) => {



    const history = useHistory();
    const [qrCode, setQrCode] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [accessToken, setAccesssToken] = useState(null);
    const products = props.cartProducts?.map((product) => {
        return (
            <div className="cart">
                <img src={product.images[0].url}/>
                <h1>{product.name}</h1>
                <h1>{product.price}</h1>

            </div>
        )
    })

    useEffect(async () => {
        const localStorage = window.localStorage;
        const accessToken = localStorage.getItem('accessToken');
        // check is user is logged in 
        const res = await fetch('http://localhost:3000/checklogin',{
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        })
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
        } else {
            setAccesssToken(accessToken);
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
    const button = accessToken?  <button onClick={handleCheckout}>Checkout</button> : <button onClick={redirectToLogin}> Login </button>

    return (
        <div>
           {products}
           <h1>Total amount ${totalAmount}</h1>
          
            <img src={qrCode} />
            {button}
        </div>
    )
}

export default Cart