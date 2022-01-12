import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {Button, Container} from "reactstrap";
import {TextareaAutosize} from "@material-ui/core";
import {Box} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import ReservationService from "../services/ReservationService";
import isDisabled from "react-native-web/dist/modules/AccessibilityUtil/isDisabled";
import {addDays, format, isValid, subDays} from "date-fns";
import CarService from "../services/CarService";
import {toBeDisabled} from "@testing-library/jest-dom/dist/matchers";
import moment from "moment";
import UserService from "../services/UserService";


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
        const totalReservationPrice = numberOfDays * dailyRentalPrice;
        return totalReservationPrice;
    }

    const historySummary = useHistory();
    const totalReservationPrice = calculateTotalRentalPrice(numberOfDays, car.daily_rental_price);

    const handleClick = async () => {
        if(JSON.parse(localStorage.getItem('item')) === null) {
            window.location.href ='/login';
        }

        let data = {
            idCar: car.idCar,
            idUser: JSON.parse(localStorage.getItem('item'))['id'],
            idHost: await UserService.getUserByIdCarRequest(car.idCar)
                .then((response) => response)
                .then((data) => {
                    console.log(data.data.idUser);
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
        historySummary.replace('/summary', {data: data});
    }

    let range
    const setDisabledDates = () => {
        for(let i = 0; i < allReservations.length; i++)
        {
            console.log("START DATE = " + allReservations[i].start_date)
            console.log("END DATE = " + allReservations[i].end_date)
            startDatesToDisableAux.push(allReservations[i].start_date)
            endDatesToDisableAux.push(allReservations[i].end_date)

        }
        setStartDatesToDisable(startDatesToDisableAux)
        setEndDatesToDisable(endDatesToDisableAux)

    }

    let myDate = new Date("01/02/2022")
    let myEndDate = new Date("01/05/2022")

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
            <Container component="main" style={{width: 500}}>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TextareaAutosize value={valueOfTextField}/>
                </Box>

                <Box  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
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
                <Box  sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: '30%',
                    marginRight: '30%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, padding: '10%'}}
                        onClick={() => handleCancelClick()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, padding: '10%'}}
                        onClick={() => handleClick()}
                    >
                        Book now
                    </Button>
                </Box>
            </Container>
        );
}

