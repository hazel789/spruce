import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Link} from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Display from './components/Display';
import LandingPage2 from './components/LandingPage2';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import ProductDetails from './components/ProductDetails';

function App() {

  const [searchInput, setSearchInput] = useState('');
  const [fetchingSearch, setFetchingSearch] = useState(false)
  const [fetchData, setFetchData] = useState({fetchData: true});

  const [cartProducts, setCartProducts] = useState([])
  return (
    <>      
      <Route exact path='/'>   
        <LandingPage2 setFetchData={setFetchData} ></LandingPage2>
      </Route>
      <Route>
        <NavBar setSearchInput={setSearchInput} setFetchingSearch={setFetchingSearch}/>
        <Route exact path='/products'>
          <Display searchInput={searchInput} fetchData={fetchData} setFetchData={setFetchData}/>
        </Route>
        <Route exact path='/cart'><Cart cartProducts={cartProducts}  setCartProducts={setCartProducts}/></Route>
        <Route exact path='/signup'><Signup/></Route>
        <Route exact path='/login'><Login/></Route>
        <Route exact path='/user'><UserProfile/></Route>
        <Route exact path='/product/:id'><ProductDetails cartProducts={cartProducts} setCartProducts={setCartProducts} /></Route>

      </Route>
     
    </>
  );
}

export default App;