import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField, Typography } from "@mui/material";
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Admin = () => {

    const history= useHistory();

    const [displayMessage, setDisplayMessage] = useState(<div></div>)
    const [values, setValues] = useState({name: '', description: '', price: 0, size: '', is_featured: false, is_new:false, urls: []});

    const handleInputChange = (event) => {
        console.log(values);

        const name = event.target.name
        const value = event.target.value
        if (name === 'is_featured' || name === 'is_new') {
            console.log(values[name]);
            setValues(
                {
                    ...values,
                    [name]: !values[name]
                }
            )
        } else {
            setValues({
                ...values,
                [name]: value
            })
        }
    }
    
    const onImageChange = async (event) => {
        let formData = new FormData();
        console.log(event.target.files);
        // formData.append('myFile', event.target.files[0]);
        const url = 'https://api.imgur.com/3/image'
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Client-ID 46647ae55318c9b',
                'Content-Type': event.target.files[0].type,
              },
            body: event.target.files[0]
        })
        
        const res = await response.json();
        console.log(res);
        const urls = [...values.urls, res.data.link];
        setValues({
            ...values,
            urls: urls
        })
    }

    const submitForm = async (event) => {
        event.preventDefault();
        console.log(values);
        const response = await fetch('http://localhost:3000/admin', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(values)
        })
        const res = await response.json()
        if (res.status === 200) {
            history.push('/products')
        } else {
            displayMessage = 
                <Typography variant='h6'>
                    Try again
                </Typography>
        }
    }
    const urlLinksDisplay = values.urls.map((link) => {
        return (
            <Typography variant='subtitle2' sx={{margin: '10px'}}>
                {link}
            </Typography>
        )
    })
    return (
        <Box justifyContent="center" alignItems="center" sx={{marginTop: '10px'}}>
            <Typography variant='h4' sx={{margin: '10px'}}>Welcome Admin!</Typography>
            <Button variant='text'><input type="file" name="myImage" onChange={onImageChange}/></Button>
            <div>{urlLinksDisplay}</div>
            <form>
            <Box justifyContent="center" alignItems="center" >
                <div>
                <TextField variant='outlined' name="name" onChange={handleInputChange} value={values.name} label="name" sx={{margin: '8px'}}/> 
                </div>
                <div>
                <TextField variant='outlined' name="description" onChange={handleInputChange} value={values.description} label="description" sx={{margin: '8px'}}/>
                </div>
                <div>
                <TextField variant='outlined' name="size" onChange={handleInputChange} value={values.size} label="size" sx={{margin: '8px'}}/>
                </div>
                <div>
                <TextField variant='outlined' name="price" onChange={handleInputChange} value={values.price} label="price" sx={{margin: '8px'}}/> 
                </div>
                <label>
                    <Checkbox
                        name="is_featured"
                        type="checkbox"
                        value={values.is_featured}
                        onChange={handleInputChange}
                        />
                    Is featured
                </label>
                <label>
                    <Checkbox
                        name="is_new"
                        type="checkbox"
                        value={values.is_new}
                        onChange={handleInputChange}
                        />
                    Is new
                </label>
                <div>
                <Button variant='contained' onClick={submitForm} sx={{margin: '8px'}}>Submit</Button>
                </div>
            </Box>
            </form>
            {displayMessage}
        </Box>
    )

}

export default Admin;
