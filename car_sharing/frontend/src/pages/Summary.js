import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import {useHistory, useLocation} from "react-router-dom";
import ReservationService from '../services/ReservationService';
import CarService from "../services/CarService";
import MailService from "../services/MailService";
import UserService from "../services/UserService";
import {styled} from "@mui/styles";

const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#f2f2f2',
    '&:hover': {
        backgroundColor: "gray",
    },
    width: '40%',
    border: 'none',
    borderRadius: 5,
}));

export default function Summary() {
    const history = useHistory();
    const location = useLocation();
    const data = location.state.data;
    let host_name = "";
    let host_mail = "";
    let customer_name = "";

    const reservationDetails = {
        idCar: data.idCar,
        idUser: data.idUser,
        city: data.city,
        address: data.address,
        start_date: data.start_date,
        start_time: data.start_time,
        end_date: data.end_date,
        end_time: data.end_time,
        total_reservation_price: data.total_reservation_price,
        payment_method: 'cash',
        status: 'booked'
    }

    const allDetailsOfCar = {
        idCar: data.idCar,
        idUser: data.idHost,
        model: data.model,
        brand: data.brand,
        plate_number: data.plate_number,
        man_year: data.man_year,
        seats: data.seats,
        body_type: data.body_type,
        driving_license_category: data.driving_license_category,
        description: data.description,
        daily_rental_price: data.daily_rental_price,
        city: data.city,
        address: data.address,
        available: 'true',
        status: 'booked'
    }

    const customerEmailDetails = {
        city: data.city,
        address: data.address,
        start_date: data.start_date,
        start_time: data.start_time,
        end_date: data.end_date,
        end_time: data.end_time,
        model: data.model,
        brand: data.brand,
        plate_number: data.plate_number,
        seats: data.seats,
        total_reservation_price: data.total_reservation_price,
    }

    const hostEmailDetails = {
        start_date: data.start_date,
        start_time: data.start_time,
        end_date: data.end_date,
        end_time: data.end_time,
        model: data.model,
        brand: data.brand,
        plate_number: data.plate_number,
        total_reservation_price: data.total_reservation_price,
    }

    const handleChange = (e) => {
        data.payment_method = (e.target.value);
    };

    const handleOnClick = (reservationDetails) => {
        ReservationService.addReservationRequest(reservationDetails).then((response)=> {
            CarService.addCarRequest(allDetailsOfCar).then();
            UserService.getUserByIdCarRequest(reservationDetails.idCar).then((res) => {
                host_name = JSON.stringify(res.data.firstName).replaceAll("\"", "") + " " + JSON.stringify(res.data.lastName).replaceAll("\"", "");
                host_mail = JSON.stringify(res.data.email).replaceAll("\"", "");

                UserService.getUserByIdRequest(reservationDetails.idUser).then((r) => {
                    customer_name = JSON.stringify(r.data.firstName).replaceAll("\"", "") + " " + JSON.stringify(r.data.lastName).replaceAll("\"", "");
                    MailService.sendMailToCustomerRequest(customerEmailDetails, host_name, host_mail, hostEmailDetails, customer_name, reservationDetails.id);
                });
            });
        }).catch(() => {
            history.replace('/reservationError');
        });

        history.replace('/reservationComplete');
    }

    function handleCancelClick() {
        window.history.replaceState({}, document.title);
        window.location.href ='/home';
    }

    return (
        <Container component="section" maxWidth="xs" sx={{marginTop: '8%', marginBottom: '100px', fontSize: 15}}>
            <CssBaseline/>
            <Typography color="secondary" component="h1" variant="h5" align='center'>
                Summary
            </Typography>

            <Box component="form" noValidate sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="carBrand"
                            label="Car Brand"
                            id="carBrand"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.brand}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="carModel"
                            required
                            fullWidth
                            id="carModel"
                            label="Car Model"
                            autoFocus
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.model}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField

                            required
                            fullWidth
                            id="plateNumber"
                            label="Plate Number"
                            name="plateNumber"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.plate_number}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="carAddress"
                            label="Car address"
                            name="carAddress"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.city + ",\n" + data.address}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="totalPrice"
                            label="Total price to pay"
                            type="totalPrice"
                            id="totalPrice"
                            color="secondary"
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.total_reservation_price}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="reservationStartDate"
                            label="Reservation start date"
                            name="reservationStartDate"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.start_date}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="reservationStartTime"
                            label="Reservation start time"
                            name="reservationStartTime"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.start_time}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="reservationEndDate"
                            label="Reservation end date"
                            name="reservationEndDate"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.end_date}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="reservationStartDate"
                            label="Reservation end time"
                            name="reservationEndTime"
                            color='secondary'
                            inputProps={
                                { readOnly: true, }
                            }
                            value = {data.end_time}
                        />
                    </Grid>
                </Grid>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose the payment method</FormLabel>
                    <RadioGroup
                        aria-label="paymentMethod"
                        defaultValue="cash"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="cash" control={<Radio />} label="Cash" onChange={handleChange}/>
                        <FormControlLabel value="creditCard" control={<Radio />} label="Credit card"  onChange={handleChange} />

                    </RadioGroup>
                </FormControl>
                <Box sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <StyledButton
                        variant="contained"
                        onClick={() => handleCancelClick()}
                    >
                        Cancel
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        type="submit"
                        onClick={() => handleOnClick(reservationDetails)}
                    >
                        Pay
                    </StyledButton>
                </Box>
            </Box>
        </Container>
    );
}
