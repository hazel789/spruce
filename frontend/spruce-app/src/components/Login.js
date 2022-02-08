import React, {useState} from "react";
import { useHistory } from "react-router-dom";
const Login = (props) => {
    const history = useHistory();

    const [values, setValues] = useState({email: '', password: ''});

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
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(values)
        })
        
        const data = await response.json()
        const result = data.res;
        if (result === "wrong_password") {
            console.log("wrong password");
        } else if (result === "no_such_user") {
            console.log("no such user!");
        }

        const refreshToken = data.refreshToken;
        const accessToken = data.accessToken;

        const myStorage = window.localStorage;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('customerId', data.customerId);

    }
    return (
        <div>
            <form>
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

export default Login;