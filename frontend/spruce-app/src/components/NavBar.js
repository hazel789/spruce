import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
    const history = useHistory();

    const handleSignup = (event) => {
        history.push('/signup');
    }

    const handleLogin = (event) => {
        history.push('/login');
    }

    const handleCart = (event) => {
        history.push('/cart');
    }

    return (
        <>
            <ul>
            <li>Spruce</li>
            <li onClick={handleSignup}>Signup</li>
            <li onClick={handleLogin}>Login</li>
            <li onClick={handleCart}>Cart</li>

            </ul>
        </>
    )
}

export default NavBar;