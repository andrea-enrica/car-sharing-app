import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import UploadFiles from "../components/UploadFiles";
import CarService from "../services/CarService";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import {useFieldArray, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UploadFilesService from "../services/FileService"
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {carBrandsList} from "../data/CarBrands";
import {citiesList} from "../data/Cities";
import {manufacturerYearList} from "../data/ManufacturerYear";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";

const styles = {
    headingStyle: {
        marginTop: 10
    },
    inputLabel: {
        width: 500,
        fontSize: 15,
        color: "secondary"
    }
}

export default function BecomeHost() {
    let [hasServerError, setHasServerError] = useState(false);
    let [isJustSaved, setIsJustSaved] = useState(false);
    const [array, setArray] = useState([]);
    const carBrands = carBrandsList;
    const cities = citiesList;
    const manufacturerYear = manufacturerYearList;

    const callBackArray = (arrayFromChild) => {
        setArray([...array].concat(arrayFromChild));
    };

    const handleDeletePictures = (index) => {
        let tempArray = [...array];
        tempArray.splice(index, 1);
        setArray(tempArray);
    }

    const validationSchema = Yup.object().shape({
        address: Yup.string().required('Address is required!'),
        city: Yup.string().required('You must select a city from the list!'),
        brand: Yup.string().required('You must select a brand for car!'),
        model: Yup.string().required('Car model is required!'),
        man_year: Yup.string().required('You must select the manufacturing year!'),
        seats: Yup.string().required('You must select the number of seats!'),
        body_type: Yup.string().required('You must select body type!'),
        driving_license_category: Yup.string().required('You must select the car license category!'),
        plate_number: Yup.string()
            .required('Plate number is required!')
            .matches(/^[A-Z]{1,2}[\s][\d]{2,3}[\s][A-Z]{3}$/,
                'Invalid plate number format!'),
        description: Yup.string().required('Description is required!'),
        daily_rental_price: Yup.number().typeError('Price must be a number!').positive('Price must be grater than zero!').required('Daily rental price is required!'),
        // file: Yup.array().test(value=> console.log(typeof(value))).required("You must upload at least one picture!"),
        //TODO: fix the upload files validation when array is empty.
        available: '',
        status: ''
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const clearErrorState = () => {
        setHasServerError(false);
    }

    // useEffect(() => {
    //     if(array.length === 0) {
    //         setError('fileError', {message:'You must upload at least one picture!'});
    //         document.getElementById('uploadError').style.display= "flex";
    //     }
    //     else {
    //         document.getElementById('uploadError').style.display= "none";
    //     }
    // }, [array])

    const onSubmit = data => {
        data.available = 'true';
        data.status = 'not booked';

        if(JSON.parse(localStorage.getItem('item')) === null) {
            window.location.href ='/login';
        }

        data.idUser = JSON.parse(localStorage.getItem('item'))['id'];
        CarService.addCarRequest(JSON.stringify(data))
            .then(() => {
                setError('apiError', {message: "The car was successfully uploaded!"});
                setHasServerError(false);
                setIsJustSaved(true);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setHasServerError(true);
                    setError('apiError', {message: "The plate number already exists!"})
                }
            })

        for (let i = 0; i < array.length; i++) {
            UploadFilesService.upload(array[i], {plate_number: data.plate_number}).then();
        }
    };

    return (
        <Container component="section" maxWidth="xs" sx={{marginBottom: '100px', width: 500,
            fontSize: 15,
            color: "secondary"}}>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography color="secondary" component="h1" variant="h5">
                    Add a new car
                </Typography>
                <Box>
                    <Snackbar
                        open={isJustSaved}
                        autoHideDuration={6000} onClose={() =>{setIsJustSaved(false); window.location.href='/home'}}
                        anchorOrigin={{vertical: "top", horizontal: "center"}}
                    >
                        <Alert onClose={() => {setIsJustSaved(false); window.location.href='/home'}} severity="success">
                            {errors.apiError && <div>{errors.apiError?.message}</div>}
                        </Alert>
                    </Snackbar>

                    <Snackbar open={hasServerError}
                              autoHideDuration={6000} onClose={() => clearErrorState()}
                              anchorOrigin={{vertical: "top", horizontal: "center"}}
                    >
                        <Alert onClose={() => clearErrorState()} severity="error">
                            {errors.apiError && <div>{errors.apiError?.message}</div>}
                        </Alert>
                    </Snackbar>
                </Box>
                <Box component="form" noValidate autocomplete='off' sx={{mt: 3, }}>
                    <Grid container spacing={2} columnSpacing={{xs: 0, sm: 0, md: 0}}>
                        <Grid item xs={12} sm={8}>
                            <h6>Where is your car located?</h6>
                            <TextField
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                color='secondary'
                                style={{width: 415}}
                                autoFocus

                                {...register('address')}
                                error={errors.address ? true : false}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.address?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <h6>Car details</h6>
                            <InputLabel required color='secondary' id="demo-simple-select-helper-label-city">City</InputLabel>
                            <Select
                                labelId="label-city"
                                id="city"
                                value={validationSchema.city}
                                defaultValue=""
                                label="City"
                                color='secondary'
                                style={{width: 415}}
                                name="city"

                                {...register('city')}
                                error={errors.city ? true : false}
                            >
                                {cities.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="inherit" color="red">
                                {errors.city?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <InputLabel required color='secondary' id="label-brand">Brand</InputLabel>
                            <Select
                                labelId="label-brand"
                                id="brand"
                                value={validationSchema.brand}
                                defaultValue=""
                                label="Brand"
                                color='secondary'
                                style={{width: 415}}
                                name="brand"

                                {...register('brand')}
                                error={errors.brand ? true : false}
                            >
                                {carBrands.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>

                            <Typography variant="inherit" color="red">
                                {errors.brand?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                fullWidth
                                id="model"
                                label="Model"
                                name="model"
                                color='secondary'
                                style={{width: 415}}

                                {...register('model')}
                                error={errors.model ? true : false}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.model?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel required color='secondary' id="label-Man-Year">Manufacturing year</InputLabel>
                            <Select
                                labelId="label-man-year"
                                id="man_year"
                                value={validationSchema.man_year}
                                defaultValue=""
                                label="Manufacturing year"
                                style={{width: 170}}
                                name="man_year"
                                color='secondary'
                                {...register('man_year')}
                                error={errors.man_year ? true : false}
                            >
                                {manufacturerYear.map((item, index) => (
                                    <MenuItem key={index} value={index+7}>{item}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="inherit" color="red">
                                {errors.man_year?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel required color='secondary' id="label-seats">Number of seats</InputLabel>
                            <Select
                                labelId="label-seats"
                                id="seats"
                                value={validationSchema.seats}
                                defaultValue=""
                                label="Seats"
                                style={{width: 240}}
                                name="seats"
                                color='secondary'
                                {...register('seats')}
                                error={errors.seats ? true : false}
                            >
                                <MenuItem value={1}>2</MenuItem>
                                <MenuItem value={2}>3</MenuItem>
                                <MenuItem value={3}>4</MenuItem>
                                <MenuItem value={4}>5</MenuItem>
                                <MenuItem value={5}>6</MenuItem>
                                <MenuItem value={6}>7</MenuItem>
                                <MenuItem value={7}>8</MenuItem>
                                <MenuItem value={8}>9</MenuItem>

                            </Select>
                            <Typography variant="inherit" color="red">
                                {errors.seats?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel required color='secondary' id="label-body-type">Body type</InputLabel>
                            <Select
                                labelId="label-body-type"
                                id="body_type"
                                value={validationSchema.body_type}
                                defaultValue=""
                                label="Body type"
                                style={{width: 170}}
                                name="body_type"
                                color='secondary'

                                {...register('body_type')}
                                error={errors.body_type ? true : false}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Family</MenuItem>
                                <MenuItem value={2}>Sedan</MenuItem>
                                <MenuItem value={3}>SUV</MenuItem>
                                <MenuItem value={4}>MUV</MenuItem>
                                <MenuItem value={5}>Coupe</MenuItem>
                                <MenuItem value={6}>Hatchback</MenuItem>
                                <MenuItem value={7}>Convertible</MenuItem>
                                <MenuItem value={8}>Pickup Truck</MenuItem>
                            </Select>

                            <Typography variant="inherit" color="red">
                                {errors.body_type?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel color='secondary' required id="label-driving-license-category">License category</InputLabel>
                            <Select
                                labelId="label-driving-license-category"
                                id="driving_license_category"
                                value={validationSchema.driving_license_category}
                                defaultValue=""
                                label="Driving license category"
                                name="driving_license_category"
                                style={{width: 240}}
                                color='secondary'

                                {...register('driving_license_category')}
                                error={errors.driving_license_category ? true : false}
                            >
                                <MenuItem value={1}>B1</MenuItem>
                                <MenuItem value={2}>B</MenuItem>
                                <MenuItem value={3}>BE</MenuItem>
                                <MenuItem value={4}>C1</MenuItem>
                                <MenuItem value={5}>C</MenuItem>
                                <MenuItem value={6}>CE</MenuItem>
                                <MenuItem value={7}>D1</MenuItem>
                                <MenuItem value={8}>D</MenuItem>
                            </Select>
                            <Typography variant="inherit" color="red">
                                {errors.driving_license_category?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                fullWidth
                                id="plate_number"
                                value={validationSchema.plate_number}
                                label="Plate number"
                                name="plate_number"
                                color='secondary'
                                style={{width: 415}}

                                {...register('plate_number')}
                                error={errors.plate_number ? true : false}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.plate_number?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                color='secondary'
                                style={{width: 415}}

                                {...register('description')}
                                error={errors.description ? true : false}
                            />

                            <Typography variant="inherit" color="red">
                            {errors.description?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <h6 sx={styles.headingStyle} color='secondary'>Upload some relevant photos</h6>
                            <div>
                                <UploadFiles parentCallback={callBackArray}/>
                                <ul>
                                    {array.map((file, index) => (
                                        // <div key={file.id}>
                                            <li key={index}>
                                            <Box sx={{display: 'flex', flexGrow:1}}>
                                                <InputLabel color='secondary' sx={styles.inputLabel}
                                                            // id='file'
                                                            // {...register(array, {required: true})}
                                                            // error={errors.file ? "true" : "false"}
                                                >{file.name}</InputLabel>
                                                <CancelPresentationIcon onClick={() => handleDeletePictures(index)}/>
                                            </Box>
                                            </li>
                                            // </div>
                                    ))}
                                    <Typography sx={{display: 'none'}} id="uploadError" variant="inherit" color="red">{errors.fileError?.message}</Typography>
                                </ul>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <div style={{width: 423}}/>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <h6 sx={styles.headingStyle}>Set the daily rental price in euro:</h6>
                            <TextField
                                required
                                fullWidth
                                id="daily_rental_price"
                                label="Daily rental price"
                                name="daily_rental_price"
                                color='secondary'
                                style={{width: 415}}

                                {...register('daily_rental_price')}
                                error={errors.daily_rental_price ? true : false}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.daily_rental_price?.message}
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
                        Upload Car
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}



