import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import newCollection from "../assets/new_collection.jpeg"
import landingImg from "../assets/landingpg_image.jpg";
import { scroller } from "react-scroll";
import logo from "../assets/spruce_logo2.PNG";
import pic1 from '../assets/pic1.JPG';
import pic2 from '../assets/pic2.JPG'

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper'
import { shadows } from '@mui/system';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


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

    const scrollToSection = () => {
        scroller.scrollTo("new-collection", {
          duration: 1100,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      };

    return (
        <>
        <Paper>

            <Box sx={{width:'100%'}}>
            <Typography sx={{position: "absolute", marginTop: "10%", marginLeft:"23%"}}>
                <img src={logo} width="65%"></img>
            </Typography>
            <Button onClick={scrollToSection}
            variant="contained" 
            size="large"
            sx={{marginLeft: "43%",
                marginTop: "50%",
                position: "absolute",
                backgroundColor: "#6b705c",
                color: "#f4a261",
                "&:hover": {backgroundColor: "#656d4a", color: "#ee9b00", boxShadow: "0px 0px 12px 4px #a5a58d",}}}>
                Enter
            </Button>
            <img src={landingImg} width="100%" marginLeft="auto" marginRight="auto"></img>
            </Box>

            <ImageList sx={{ width: '100%' }}>
            <ImageListItem className="new-collection" onClick={handleOnClickNew} sx={{cursor:'pointer'}}>
            <img src={pic1} loading="lazy"/>
            <ImageListItemBar
                title='New Collection'
                subtitle={<span>| Get first dibs</span>}
                position="below"
            />
            </ImageListItem>

            <ImageListItem onClick={handleOnClickFeatured} sx={{cursor:'pointer'}}>
            <img src={pic2} loading="lazy"/>
            <ImageListItemBar
                title='Featured Items'
                subtitle={<span>| Our editor's picks</span>}
                position="below"
            />
            </ImageListItem>
            </ImageList>

            {/* <Box className="new-collection">New Collection
                <img src={newCollection} onClick={handleOnClickNew} />
            </Box>
                <h2 className="header-title3">Featured Items</h2>
                <img src={newCollection} onClick={handleOnClickFeatured} /> */}
            </Paper>
        </>
    )
}

export default LandingPage2