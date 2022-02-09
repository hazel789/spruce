import React, { useState } from "react";

const Admin = () => {

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
            // TODO: make success story
        } else {
            // TODO: make failure story
        }
    }
    const urlLinksDisplay = values.urls.map((link) => {
        return (
            <p>
                {link}
            </p>
        )
    })
    return (
        <div>

          
            <input type="file" name="myImage" onChange={onImageChange} />
            <div>{urlLinksDisplay}</div>
            <form>
                <input type="text" name="name" onChange={handleInputChange} value={values.name} placeholder="name"/> 
                <input type="text" name="description" onChange={handleInputChange} value={values.description} placeholder="description"/>
                <input type="text" name="size" onChange={handleInputChange} value={values.size} placeholder="size"/>
                <input type="text" name="price" onChange={handleInputChange} value={values.price} placeholder="price"/> 
                <label>
                    <input
                        name="is_featured"
                        type="checkbox"
                        value={values.is_featured}
                        onChange={handleInputChange}
                        />
                    Is featured
                </label>
                <label>
                    <input
                        name="is_new"
                        type="checkbox"
                        value={values.is_new}
                        onChange={handleInputChange}
                        />
                    Is new
                </label>
                <input type="submit" onClick={submitForm}/>
            </form>
        </div>
    )

}

export default Admin;
