import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import newCollection from "../assets/new_collection.jpeg"
import './landingpage2.css'

const LandingPage2 = (props) => {
    const history = useHistory();
       
    const handleOnClickNew = (event) => {
        event.preventDefault();
        history.push('/products')
        props.setFetchData({fetchData: true, is_new: true});
    }
           
    const handleOnClickFeatured = (event) => {
        event.preventDefault();
        history.push('/products')
        props.setFetchData({fetchData: true, is_featured: true});
    }

    return (
        <header>
            <div className='header'>
                <h2 className="header-title2" >New Collection</h2>
                <img src={newCollection} onClick={handleOnClickNew} />
                <h2 className="header-title3">Featured Items</h2>
                <img src={newCollection} onClick={handleOnClickFeatured} />

            </div>

        </header>
    )
}

export default LandingPage2