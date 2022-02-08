import React, {useState} from "react";
import { useHistory } from "react-router-dom";
const Signup = (props) => {
    const history = useHistory();

    const [values, setValues] = useState({name: '', address: '', email: '', password: ''});

    const handleInputChange = (event) => {
        console.log(values);

        const name = event.target.name
        const value = event.target.value
        setValues({
            ...values,
            [name]: value
        })
    }

    const submitForm = async (event) => {
        console.log(values);
        event.preventDefault();
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(values)
        })
        console.log(await response.json());
        history.push('/');
    }
    return (
        <div>
            <form>
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChange}/>
            </label>
            <label>
                Address:
                <input type="text" name="address" value={values.address} onChange={handleInputChange}/>
            </label>
            <label>
                Email:
                <input type="text" name="email" value={values.email} onChange={handleInputChange}/>
            </label>
            <label>
                Password:
                <input type="text" name="password" value={values.password} onChange={handleInputChange}/>
            </label>
            <input type="submit" value="Submit" onClick={submitForm} />
            </form>
        </div>
    )
}

export default Signup;