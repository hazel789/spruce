import React, { useState } from 'react';
import { Navbar } from 'react-bulma-components';
import { useHistory } from "react-router-dom";
import logo from "../assets/spruce_logo.jpg";

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
            <Navbar>
            <Navbar.Brand>
                <Navbar.Item href="/">
                <img src={logo} height="30px"/>
                </Navbar.Item>
                <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container align="right">
                <Navbar.Item href="#">
                    <Navbar.Link>
                    Account
                    </Navbar.Link>
                    <Navbar.Dropdown>
                    <Navbar.Item onClick={handleSignup}>
                        Register
                    </Navbar.Item>
                    <Navbar.Item onClick={handleLogin}>
                        Login
                    </Navbar.Item>
                    </Navbar.Dropdown>
                    </Navbar.Item>
                    </Navbar.Container>

                    <Navbar.Divider />
                    <Navbar.Item href="#">
                        Search
                    </Navbar.Item>

                <Navbar.Container align="right">
                <Navbar.Item onClick={handleCart}>
                    Cart
                </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
            </Navbar>
        </>
    )
}

export default NavBar;