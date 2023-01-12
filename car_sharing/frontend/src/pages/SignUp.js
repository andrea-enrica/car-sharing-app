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
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Snackbar} from '@material-ui/core';
import UserService from "../services/UserService";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function SignUp() {
    const [hasServerError, setHasServerError] = useState(false);
    let [isJustSaved, setIsJustSaved] = useState(false);
    const {t, i18n} = useTranslation();
    const [,setLanguage] =useState('');

    useEffect(() => {
        i18n
            .changeLanguage(sessionStorage.getItem("state"))
            .then(() => setLanguage(sessionStorage.getItem("state")))
            .catch(err => console.log(err));
    },[i18n])

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        return UserService.singUpRequest(JSON.stringify(data))
            .then(response => {
                if (JSON.parse(JSON.stringify(response.data))['message'] === "User registered successfully!") {
                    setError('apiError', {message: JSON.parse(JSON.stringify(response.data))['message']})
                    setHasServerError(false);
                    setIsJustSaved(true);
                } else {
                    setError('apiError', {message: JSON.parse(JSON.stringify(response.data))['message']})
                    setHasServerError(true);
                    setIsJustSaved(false);
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
                <Box className={'popUpMessages'}>
                    <Snackbar
                        open={isJustSaved}
                        autoHideDuration={6000} onClose={() => {
                        setIsJustSaved(false);
                        window.location.href = '/login'
                    }}
                        anchorOrigin={{vertical: "top", horizontal: "center"}}
                    >
                        <Alert onClose={() => {
                            setIsJustSaved(false);
                            window.location.href = '/login'
                        }} severity="success">
                            {errors.apiError && <div>{errors.apiError?.message}</div>}
                        </Alert>
                    </Snackbar>

                    <Snackbar open={hasServerError} autoHideDuration={6000} onClose={() => clearErrorState()}
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
                    {t("sign up")}
                </Typography>

                <Box component="form" noValidate sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label={t("first name")}
                                autoFocus
                                color='secondary'
                                {...register('firstName')}
                                error={!!errors.firstName}
                            />
                            <Typography color="red">
                                {errors.firstName?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label={t("last name")}
                                name="lastName"
                                color='secondary'
                                {...register('lastName')}
                                error={!!errors.lastName}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.lastName?.message}
                            </Typography>
                        </Grid>
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
                                id="email"
                                label={t("email address")}
                                name="email"
                                color='secondary'
                                {...register('email')}
                                error={!!errors.email}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.email?.message}
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
                                color="secondary"
                                {...register('password')}
                                error={!!errors.password}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                label={t("confirm password")}
                                type="password"
                                fullWidth
                                color='secondary'
                                {...register('confirmPassword')}
                                error={!!errors.confirmPassword}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.confirmPassword?.message}
                            </Typography>
                        </Grid>

                        {/*<Grid item xs={12}>*/}
                        {/*    <Typography component={'span'}>*/}
                        {/*        <FormControlLabel*/}
                        {/*            control={*/}
                        {/*                <Controller*/}
                        {/*                    control={control}*/}
                        {/*                    name="acceptTerms"*/}
                        {/*                    defaultValue="false"*/}
                        {/*                    inputRef={register()}*/}
                        {/*                    render={({ field: { onChange } }) => (*/}
                        {/*                        <Checkbox*/}
                        {/*                            color="primary"*/}
                        {/*                            onChange={e => onChange(e.target.checked)}*/}
                        {/*                        />*/}
                        {/*                    )}*/}
                        {/*                />*/}
                        {/*            }*/}
                        {/*            label={*/}
                        {/*                <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>*/}
                        {/*                    I have read and agree to the Terms **/}
                        {/*                </Typography>*/}
                        {/*            }*/}
                        {/*        />*/}
                        {/*    </Typography>*/}
                        {/*    <Typography variant="inherit" color="red">*/}
                        {/*        {errors.acceptTerms*/}
                        {/*            ? '(' + errors.acceptTerms.message + ')'*/}
                        {/*            : ''}*/}
                        {/*    </Typography>*/}
                        {/*    <br/>*/}
                        {/*</Grid>*/}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        sx={{mt: 3, mb: 2}}
                    >
                        {t("sign up")}
                    </Button>

                    <Grid container sx={{marginTop: 2}}>
                        <Grid item>
                            <Link color='secondary' href="/login" variant="body2">
                                {t("already have an account?")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}