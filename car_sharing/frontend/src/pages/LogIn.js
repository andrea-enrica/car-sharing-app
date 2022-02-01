import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import UserService from "../services/UserService";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function LogIn() {
    const [hasServerError, setHasServerError] = useState(false);
    const {t, i18n} = useTranslation();
    const [currentLanguage,setLanguage] =useState('');

    useEffect(() => {
        i18n
            .changeLanguage(sessionStorage.getItem("state"))
            .then(() => setLanguage(sessionStorage.getItem("state")))
            .catch(err => console.log(err));
        console.log(sessionStorage.getItem("state"))
    },[])
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data, event) => {
        event.preventDefault();
        UserService.logInRequest(JSON.stringify(data))
            .then(response => {
                sessionStorage.setItem('item', JSON.stringify(response.data));
                window.location.href = '/home';
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setHasServerError(true);
                    setError('apiError', {message: "Invalid credentials!"})
                }
            })
    };

    const clearErrorState = () => {
        setHasServerError(false);
    }

    return (
        <Container component="section" maxWidth="xs" sx={{marginBottom: '100px'}}>
            <CssBaseline/>
            <Box sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'secondary'
            }}>
                <Box>
                    <Snackbar open={hasServerError}
                              autoHideDuration={6000} onClose={() => clearErrorState()}
                              anchorOrigin={{vertical: "top", horizontal: "center"}}
                    >
                        <Alert onClose={() => clearErrorState()} severity="error">
                            {errors.apiError && <div>{errors.apiError?.message}</div>}
                        </Alert>
                    </Snackbar>
                </Box>

                <Avatar sx={{m: 1, backgroundColor: 'secondary'}}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography color="secondary" component="h1" variant="h5">
                    {t("log in")}
                </Typography>

                <Box component="form" noValidate sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="username"
                                label={t("username")}
                                id="username"
                                color='secondary'
                                {...register('username')}
                                error={!!errors.username}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.username?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label={t("password")}
                                type="password"
                                id="password"
                                color='secondary'
                                {...register('password')}
                                error={!!errors.password}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        sx={{mt: 3, mb: 2}}
                    >
                        {t("log in")}
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link color={'secondary'} href="#" variant="body2">
                                {t("forgot password?")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link color={'secondary'} href="/signup" variant="body2">
                                {t("don't have an account?")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}