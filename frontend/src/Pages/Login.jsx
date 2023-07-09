import React, {useState} from 'react';
import {Box, Container, CssBaseline, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import LogoName from "../Components/LogoName";
import LoginButton from "../Components/UI/LoginButton";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {login} from "../http/userApi";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {setUserData, toggleAuth} from "../Store/slices/userSlice";
import {MAIN_ROUTE, SIGNUP_ROUTE} from "../utils/consts";


const Login = () => {
    // TODO:: validate form

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit() {

        const res = await login(email, password);
        if (res.success) {
            dispatch(setUserData(res.body));
            dispatch(toggleAuth());
            navigate('/', {replace: true});
        }
        else {
            const msg = res.body || "Произошла ошибка!";
            setError(msg);
        }
    }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    return (
        <CssBaseline>
            <Container sx={{
                minHeight: '100vh',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} maxWidth={"sm"}
            >
                <Box
                    component={Paper}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    elevation={2}

                    sx={{
                        p: {xs: 3, sm: 6, md: 8}
                    }}
                >
                    <Box maxWidth={180}>
                        <Typography variant={'subtitle1'} textAlign={'center'}>
                            Sign in to
                        </Typography>
                        <LogoName/>
                    </Box>

                    {!!error &&
                        <Box sx={{
                            bgcolor: 'error.main',
                            py: 1,
                            width: 1,
                            color: 'error.contrastText',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: 1
                        }}>
                            <Typography>
                                {error}
                            </Typography>
                            <CloseIcon onClick={() => setError('')}/>
                        </Box>
                    }


                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type={'password'}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    <Box my={3} width={1}>
                        <LoginButton onClick={handleSubmit}/>
                    </Box>

                    <Grid container sx={{
                        flexDirection: {xs: 'column', sm: 'row'},
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Grid item xs whiteSpace={"nowrap"}>
                            <Link component={RouterLink} to={MAIN_ROUTE} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        {/*TODO: forgot password and signUp*/}
                        <Grid item xs whiteSpace={"nowrap"}>
                            <Link component={RouterLink} to={SIGNUP_ROUTE} variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </CssBaseline>

    );
};

export default Login;