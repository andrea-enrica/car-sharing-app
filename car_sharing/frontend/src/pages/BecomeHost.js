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
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import UploadFilesService from "../services/FileService"
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {carBrandsList} from "../data/CarBrands";
import {citiesList} from "../data/Cities";
import {manufacturerYearList} from "../data/ManufacturerYear";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";
import '../assets/i18n/i18n';

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
    const {t, i18n} = useTranslation();
    const [currentLanguage,setLanguage] =useState('');
    let [hasServerError, setHasServerError] = useState(false);
    let [isJustSaved, setIsJustSaved] = useState(false);
    const [array, setArray] = useState([]);
    const carBrands = carBrandsList;
    const cities = citiesList;
    const manufacturerYear = manufacturerYearList;

    useEffect(() => {
        i18n
            .changeLanguage(sessionStorage.getItem("state"))
            .then(() => setLanguage(sessionStorage.getItem("state")))
            .catch(err => console.log(err));
    },[])

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

    const onSubmit = data => {
        data.available = 'true';
        data.status = 'not booked';

        if(JSON.parse(sessionStorage.getItem('item')) === null) {
            window.location.href ='/login';
        }

        data.idUser = JSON.parse(sessionStorage.getItem('item'))['id'];
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
        <Container component="section" maxWidth="xs" sx={{
            marginBottom: '100px', width: 500,
            fontSize: 15,
            color: "secondary"
        }}>
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
                    {t("add a new car")}
                </Typography>
                <Box>
                    <Snackbar
                        open={isJustSaved}
                        autoHideDuration={6000} onClose={() => {
                        setIsJustSaved(false);
                        window.location.href = '/home'
                    }}
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
                            <h6>{t("where is your car located")}</h6>
                            <TextField
                                required
                                fullWidth
                                id="address"
                                label={t("address")}
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
                            <h6>{t("car details")}</h6>
                            <InputLabel required color='secondary' id="demo-simple-select-helper-label-city">{t("city")}</InputLabel>
                            <Select
                                labelId="label-city"
                                id='city'
                                value={validationSchema.city}
                                defaultValue=""
                                label="city"
                                color='secondary'
                                style={{width: 415}}
                                name='city'

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
                            <InputLabel required color='secondary' id="label-brand">{t("brand")}</InputLabel>
                            <Select
                                labelId="label-brand"
                                id="brand"
                                value={validationSchema.brand}
                                defaultValue=""
                                label="brand"
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
                                label={t("model")}
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
                            <InputLabel required color='secondary' id="label-Man-Year">{t("manufacturing year")}</InputLabel>
                            <Select
                                labelId="label-man-year"
                                id="man_year"
                                value={validationSchema.man_year}
                                defaultValue=""
                                label="man_year"
                                style={{width: 170}}
                                name="man_year"
                                color='secondary'
                                {...register('man_year')}
                                error={errors.man_year ? true : false}
                            >
                                {manufacturerYear.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="inherit" color="red">
                                {errors.man_year?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel required color='secondary' id="label-seats">{t("number of seats")}</InputLabel>
                            <Select
                                labelId="label-seats"
                                id="seats"
                                value={validationSchema.seats}
                                defaultValue=""
                                label="number of seats"
                                style={{width: 240}}
                                name="seats"
                                color='secondary'
                                {...register('seats')}
                                error={errors.seats ? true : false}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>


                            </Select>
                            <Typography variant="inherit" color="red">
                                {errors.seats?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel required color='secondary' id="label-body-type">{t("body type")}</InputLabel>
                            <Select
                                labelId="label-body-type"
                                id="body_type"
                                value={validationSchema.body_type}
                                defaultValue=""
                                label="body type"
                                style={{width: 170}}
                                name="body_type"
                                color='secondary'

                                {...register('body_type')}
                                error={errors.body_type ? true : false}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Family"}>Family</MenuItem>
                                <MenuItem value={"Sedan"}>Sedan</MenuItem>
                                <MenuItem value={"SUV"}>SUV</MenuItem>
                                <MenuItem value={"MUV"}>MUV</MenuItem>
                                <MenuItem value={"Coupe"}>Coupe</MenuItem>
                                <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
                                <MenuItem value={"Convertible"}>Convertible</MenuItem>
                                <MenuItem value={"Pickup Truck"}>Pickup Truck</MenuItem>
                            </Select>

                            <Typography variant="inherit" color="red">
                                {errors.body_type?.message}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel color='secondary' required id="label-driving-license-category">{t("licence")}</InputLabel>
                            <Select
                                labelId="label-driving-license-category"
                                id="driving_license_category"
                                value={validationSchema.driving_license_category}
                                defaultValue=""
                                label="license"
                                name="driving_license_category"
                                style={{width: 240}}
                                color='secondary'

                                {...register('driving_license_category')}
                                error={errors.driving_license_category ? true : false}
                            >
                                <MenuItem value={"A1"}>{"A1"}</MenuItem>
                                <MenuItem value={"B1"}>{"B1"}</MenuItem>
                                <MenuItem value={"A"}>{"A"}</MenuItem>
                                <MenuItem value={"B"}>{"B"}</MenuItem>
                                <MenuItem value={"BE"}>{"BE"}</MenuItem>
                                <MenuItem value={"C"}>{"C"}</MenuItem>
                                <MenuItem value={"CE"}>{"CE"}</MenuItem>
                                <MenuItem value={"D"}>{"D"}</MenuItem>

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
                                label={t("plate number")}
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
                                label={t("description")}
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
                            <h6 sx={styles.headingStyle} color='secondary'>{t("upload")}</h6>
                            <div>
                                <UploadFiles parentCallback={callBackArray}/>
                                <ul>
                                    {array.map((file, index) => (
                                        <li key={index}>
                                            <Box sx={{display: 'flex', flexGrow:1}}>
                                                <InputLabel color='secondary' sx={styles.inputLabel}>{file.name}</InputLabel>
                                                <CancelPresentationIcon onClick={() => handleDeletePictures(index)}/>
                                            </Box>
                                        </li>
                                    ))}
                                    <Typography sx={{display: 'none'}} id="uploadError" variant="inherit" color="red">{errors.fileError?.message}</Typography>
                                </ul>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <div style={{width: 423}}/>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <h6 sx={styles.headingStyle}>{t("set the daily price")}</h6>
                            <TextField
                                required
                                fullWidth
                                id="daily_rental_price"
                                label={t("daily rental price")}
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
                        {t("upload car")}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}



