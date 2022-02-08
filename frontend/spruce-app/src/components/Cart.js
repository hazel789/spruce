import React, {useEffect, useState} from "react";


const Cart = (props) => {
    
    const [qrCode, setQrCode] = useState()
    const [totalAmount, setTotalAmount] = useState(0)
    const products = props.cartProducts?.map((product) => {
        return (
            <div className="cart">
                <img src={product.images[0].url}/>
                <h1>{product.name}</h1>
                <h1>{product.price}</h1>

            </div>
        )
    })

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
    }
    return (
        <div>
           {products}
           <h1>Total amount ${totalAmount}</h1>
           <button onClick={handleCheckout}>Checkout</button>
            <img src={qrCode} />
        </div>
    )
}

export default Cart