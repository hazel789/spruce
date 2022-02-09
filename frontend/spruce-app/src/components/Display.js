import React, { useEffect, useState } from "react";
import { Route, Link} from 'react-router-dom';
import ProductCard from "./ProductCard";
import ProductDetails from './ProductDetails'
import { useLocation } from "react-router-dom";

import { Form } from 'react-bulma-components';

// import './display.css';

const Display = (props) => {
    const location = useLocation();

    const [productsData, setProductsData] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const handleOnChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handleOnClickSearch = (event) => {
        event.preventDefault();
        let queryURL = `http://localhost:3000/product/search?fuzzy=${searchInput}`
        fetchData(queryURL)
        }

    const fetchData = async (url) => {
        const resp = await fetch(url)
        props.setFetchData({fetchData: false})
        
        const products = await resp.json();
        console.log(products);
        setProductsData(products);
    }

    useEffect(() => {
        let queryURL = 'http://localhost:3000/product/search?'
        if (!props.fetchData?.fetchData) {
            return; 
        }
        if (props.fetchData.is_new) {
            queryURL += '&is_new=true'
        }
        if (props.fetchData.is_featured) {
            queryURL += '&is_featured=true'
        }
        fetchData(queryURL)
        
    }, [props.fetchData, location])

    useEffect(() => {
        let queryURL = 'http://localhost:3000/product/search'
        fetchData(queryURL)
        
    }, [])

    let display = productsData.map((product) => {
        return (
            <div className="productcards"  >
                <Link className="link" to={{
                        pathname: `/product/${product.id}`
                        }}>
                    < ProductCard  product={product}/>
                </Link>

                
            </div>
        )
    })

    return (

        <>
            <form>
            <input value={searchInput} htmlFor="search" placeholder="Search" className="searchBar" onChange={handleOnChange}></input>
            <input type="submit" id='searchButton' onClick={handleOnClickSearch}></input>
            </form>
        
            <div className="display-results">
                {display}
            </div>

        </>

        )
    }

export default Display