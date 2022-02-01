import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {Container} from "reactstrap";
import Button from '@mui/material/Button';
import {TextareaAutosize} from "@material-ui/core";
import {Alert, Box, Snackbar} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import ReservationService from "../services/ReservationService";
import isDisabled from "react-native-web/dist/modules/AccessibilityUtil/isDisabled";
import {addDays, format, isValid, subDays} from "date-fns";
import CarService from "../services/CarService";
import {toBeDisabled} from "@testing-library/jest-dom/dist/matchers";
import moment from "moment";
import UserService from "../services/UserService";
import CssBaseline from "@mui/material/CssBaseline";
import {styled} from "@mui/styles";
import CarouselCarDetails from "../components/Carousel";
import Grid from "@mui/material/Grid";

const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#f2f2f2',
    '&:hover': {
        backgroundColor: "gray",
    },
    border: 'none',
    borderRadius: 5,
}));

export default function CarDetails(){
    const location = useLocation();
    const car = location.state.car
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [timeEnd, setEndTime] = useState(new Date());
    const [timeStart, setStartTime] = useState(new Date());
    const [startDatesToDisable, setStartDatesToDisable] = useState([]);
    const [endDatesToDisable, setEndDatesToDisable] = useState([]);
    let startDatesToDisableAux = [];
    let endDatesToDisableAux = [];

    const [allReservations, setAllReservations] = useState([])

    const getReservations = async (id_car) => {
        return await ReservationService.getReservationByIdCar(id_car);
    }
    useEffect(() => {
        getReservations(car.idCar).then(result => {setAllReservations(result.data)})
    },[])

    const handleStartDateChange = (newDate) =>
    {
        setDateStart(newDate);
    }

    const handleEndDateChange = (newDate) =>
    {
        setDateEnd(newDate);
    }

    const handleStartTimeChange = (newTime) => {
        setStartTime(newTime);
    }

    const handleEndTimeChange = (newTime) => {
        setEndTime(newTime);
    }

    function dateConverter(startDate, endDate){
        const diffInMs = Math.abs(endDate -startDate );
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    }

    const numberOfDays = dateConverter(dateStart, dateEnd);
    const calculateTotalRentalPrice = (numberOfDays, dailyRentalPrice) => {
        let totalReservationPrice = numberOfDays * dailyRentalPrice;
        if(numberOfDays === 0)
            return dailyRentalPrice;
        return totalReservationPrice;
    }

    const historySummary = useHistory();
    const totalReservationPrice = calculateTotalRentalPrice(numberOfDays, car.daily_rental_price);
    let [isJustSaved, setIsJustSaved] = useState(false);
    const handleClick = async () => {

        if(JSON.parse(sessionStorage.getItem('item')) === null) {
            window.location.href ='/login';
        }

        let data = {
            idCar: car.idCar,
            idUser: JSON.parse(sessionStorage.getItem('item'))['id'],
            idHost: await UserService.getUserByIdCarRequest(car.idCar)
                .then((response) => response)
                .then((data) => {
                    return data.data.idUser;
                }),
            model: car.model,
            brand: car.brand,
            plate_number: car.plate_number,
            man_year: car.man_year,
            seats: car.seats,
            body_type: car.body_type,
            driving_license_category: car.driving_license_category,
            description: car.description,
            daily_rental_price: car.daily_rental_price,
            start_date: dateStart.toLocaleDateString(),
            end_date: dateEnd.toLocaleDateString(),
            start_time: timeStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            end_time: timeEnd.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            total_reservation_price: totalReservationPrice,
            city: car.city,
            address: car.address,
            available: 'true',
            status: 'booked'
        }
        if(dateStart > dateEnd){
            setIsJustSaved(true)
        }else{
            historySummary.replace('/summary', {data: data});
        }

    }

    const setDisabledDates = () => {
        for(let i = 0; i < allReservations.length; i++)
        {
            startDatesToDisableAux.push(allReservations[i].start_date)
            endDatesToDisableAux.push(allReservations[i].end_date)

        }
        setStartDatesToDisable(startDatesToDisableAux)
        setEndDatesToDisable(endDatesToDisableAux)
    }

    function disableDays(date) {
        if(startDatesToDisable !== undefined)
        {   let i = 0
            require('moment-range').extendMoment(moment);

            const start = new Date("1/30/2022"), end = new Date("2/2/2022")
            // const range = moment.range(moment(start), moment(end));
            let dateStr = []
            for(let i = 0 ; i < startDatesToDisable.length; i++)
            {
                for (let m = moment(startDatesToDisable[i]); m.isBefore(endDatesToDisable[i]); m.add(1, 'days')) {
                    dateStr.push(m.format('M/D/YYYY'))
                }
                dateStr.push(moment(endDatesToDisable[i]).format('M/D/YYYY'))
            }

            return date.toLocaleDateString() == dateStr.filter(myDate => myDate == date.toLocaleDateString())
        }
        else return false
    }

    const valueOfTextField = "Model " + car.model + "\n" + "Brand " + car.brand + "\n";

    function handleCancelClick() {
        setDateStart(new Date());
        setDateEnd(new Date());
        setEndTime(new Date());
        setStartTime(new Date());
        window.history.replaceState({}, document.title);
        window.location.href ='/home';
    }

    return (

        <Container component="main" style={{width: "70%", height:"100%"}}>

            <CssBaseline/>
            <CarouselCarDetails keyWord={car} />
            <Box sx={{marginTop: 10, display: 'flex', flexDirection: 'row', marginLeft: 25}} position={"relative"}>
                {/*<Box component="form" noValidate position={"relative"} style={{top: "5px"}} sx={{mt: 3}}>*/}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            style={{width:"43%"}}
                            name="carBrand"
                            label="Car Brand"
                            id="carBrand"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.brand}

                        />
                    </Grid>
                    <Grid item xs={13} sm={6}>
                        <TextField
                            name="carModel"
                            style={{width:"38%",left:"-55%"}}
                            required
                            fullWidth
                            id="carModel"
                            label="Car Model"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.model}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            fullWidth
                            id="carCity"
                            label="City"
                            name="carCity"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.city}
                            style={{width: "20%",top: "-130%",left:"45%"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            style={{width:"65%",top:"-140%"}}
                            id="carAddress"
                            label="Address"
                            name="carAddress"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.address}
                        />
                    </Grid>
                    <Grid item xl>
                        <TextField
                            required
                            fullWidth
                            style={{width:"88%",top:"-150%"}}
                            id="plateNumber"
                            label="Plate Number"
                            name="plateNumber"

                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.plate_number}
                        />
                    </Grid>
                    <Grid item xl>
                        <TextField
                            required
                            fullWidth
                            id="carManYear"
                            label="Manufacturing Year"
                            name="carManYear"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.man_year}
                            style={{width: "60%",top:"-150%",left:"-20%"}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            fullWidth
                            id="carSeats"
                            label="Number of seats"
                            name="carNumberOfSeats"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.seats}
                            style={{width: "80%",top:"-150%",left:"-64%"}}
                        />
                    </Grid>
                    <Grid item xl>
                        <TextField
                            required
                            fullWidth
                            id="carBodyType"
                            label="Body type"
                            name="carBodyType"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.body_type}
                            style={{width: "108%",top:"-150%", left:"-86%"}}
                        />
                    </Grid>
                    <Grid item xl>
                        <TextField
                            required
                            fullWidth
                            id="carDrivingLicense"
                            label="Driving License Category"
                            name="carDrivingLicenseCategory"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            style={{width: "365%",top:"-30%", left:"-455%"}}
                            value={car.driving_license_category}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="carDescription"
                            label="Description"
                            name="carDescription"
                            color='secondary'
                            style={{width: "65.3%",top:"-40%"}}
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="carDailyPrice"
                            label="Daily price"
                            name="carDailyPrice"
                            color='secondary'
                            inputProps={
                                {readOnly: true,}
                            }
                            value={car.daily_rental_price}
                            style={{width: "65.3%", top:"-50%"}}
                        />
                    </Grid>
                </Grid>
                {/*</Box>*/}

                <Box  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                      position={"relative"}
                      style={{top:"20%", right:"25%"}}
                >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                position = {"absolute"}
                                style={{top:"25%"}}
                                label="Start date"
                                inputFormat="MM/dd/yyyy"
                                onChange={handleStartDateChange}
                                disablePast

                                value={dateStart}
                                renderInput={(params) => <TextField {...params} />
                                }

                                onOpen={() => setDisabledDates()}
                                shouldDisableDate={disableDays}
                            />

                            <TimePicker
                                label="Start time"
                                onChange={handleStartTimeChange}
                                value={timeStart}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                label="End date"
                                inputFormat="MM/dd/yyyy"
                                onChange={handleEndDateChange}
                                disablePast
                                value={dateEnd}
                                renderInput={(params) => <TextField {...params} />}
                                onOpen={() => setDisabledDates()}
                                shouldDisableDate={disableDays}
                            />
                            <TimePicker
                                label="Start time"
                                onChange={handleEndTimeChange}
                                value={timeEnd}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Snackbar
                        open={isJustSaved}
                        autoHideDuration={6000} onClose={() => {
                        setIsJustSaved(false);
                        window.location.href = '/carDetails'
                    }}
                        anchorOrigin={{vertical: "top", horizontal: "center"}}
                    >
                        <Alert onClose={() => {setIsJustSaved(false)}} severity="success">
                            {<div>The dates are incorrect!</div>}
                        </Alert>
                    </Snackbar>

                    <Snackbar open={isJustSaved}
                              autoHideDuration={6000} onClose={() => setIsJustSaved(false)}
                              anchorOrigin={{vertical: "top", horizontal: "center"}}
                    >
                        <Alert onClose={() => setIsJustSaved(false)} severity="error">
                            {<div>The dates are incorrect!</div>}
                        </Alert>
                    </Snackbar>
                </Box>
                <Box sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',

                }}>
                    <StyledButton
                        sx={{marginRight: 7, left:"40%"}}
                        variant="contained"
                        onClick={() => handleCancelClick()}
                    >
                        Cancel
                    </StyledButton>
                    <StyledButton
                        sx={{marginRight: 7, left:"40%"}}
                        type="submit"
                        variant="contained"
                        onClick={() => handleClick()}
                    >
                        Book now
                    </StyledButton>
                </Box>
            </Box>
        </Container>
    );
}

