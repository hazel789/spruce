import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { browserHistory } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Login = (props) => {
    const history = useHistory();
    // const browserHistory = ReactRouter.browserHistory;

    const [displayMessage, setDisplayMessage] = useState(<div></div>);

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
        setDisplayMessage((<div></div>))
        if (result === "wrong_password") {
            console.log("wrong password");
            setDisplayMessage((
              <Typography sx={{margin: 'auto'}} variant="caption" color="red">
                Wrong password!
              </Typography>))
        } else if (result === "no_such_user") {
            console.log("no such user!");
            setDisplayMessage(
              <Typography sx={{margin: 'auto'}} variant="caption" color="red">
                User not found
              </Typography>)
        } else {
          const refreshToken = data.refreshToken;
          const accessToken = data.accessToken;

          const myStorage = window.localStorage;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('customerId', data.customerId);
          console.log("successful");
          history.push('/products');
        }
    }

    return (
        <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                onChange={handleInputChange}
                value={values.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
                autoFocus
            />
            <TextField
            onChange={handleInputChange}
            value={values.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
             
            />
            <div>
            {displayMessage}
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            <Button
              onClick={submitForm}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#f2bc50", "&:hover": {background: "#ed902d"}}}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{color: "gray"}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      </>
    )
}

export default Login;