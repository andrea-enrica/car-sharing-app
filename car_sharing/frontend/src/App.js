import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import "./App.css";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Layout from "./components/Layout";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import BecomeHost from "./pages/BecomeHost";
import React, {useEffect} from 'react';
import LayoutLoggedIn from './components/LayoutLoggedIn';
import CarDetails from "./pages/CarDetails";
import Summary from "./pages/Summary";
import ReservationComplete from "./pages/ReservationComplete";
import MyReservations from "./pages/MyReservations";
import MyCars from "./pages/MyCars";
import ReservationError from "./pages/ReservationError";

const theme = createTheme({
    typography: {
        fontFamily: ['Playfair+Display', 'Source+Sans+Pro'].join(',')
    },
    palette: {
        primary: {
            main: '#f2f2f2'
        },
        secondary: {
            main: '#2b6777'
        }
    }
});

function clearStorage() {
    let session = sessionStorage.getItem('ref');
    if (session === null) {
        localStorage.removeItem('item');
    }
    sessionStorage.setItem('ref', 1);
}

window.addEventListener('load', clearStorage);

const LogInLayout = () => {
    return (
        <Layout>
            <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route exact path="/home">
                    <Home/>
                </Route>
            </Switch>
            <Switch>
                <Route path="/login">
                    <LogIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/addcar">
                    <BecomeHost/>
                </Route>
                <Route path="/carDetails">
                    <CarDetails/>
                </Route>
            </Switch>
        </Layout>
    )
}

const LoggedInLayout = () => {
    return (
        <LayoutLoggedIn>
            <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route exact path="/home">
                    <Home/>
                </Route>
            </Switch>
            <Switch>
                <Route path="/login">
                    <LogIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/addcar">
                    <BecomeHost/>
                </Route>
                <Route path="/carDetails">
                    <CarDetails/>
                </Route>
                <Route path = "/summary">
                    <Summary/>
                </Route>
                <Route  path="/reservationComplete">
                    <ReservationComplete/>
                </Route>
                <Route  path="/reservationError">
                    <ReservationError/>
                </Route>
                <Route path = "/reservationTable">
                    <MyReservations/>
                </Route>
                <Route path = "/myCars">
                    <MyCars/>
                </Route>
            </Switch>
        </LayoutLoggedIn>
    )
}

function LoggedInStatus() {
    const isUser = localStorage.getItem('item');
    console.log("exista user", isUser);

    if(isUser !== null) {
        return <LoggedInLayout/>
    } else {
        return <LogInLayout/>
    }
}

function App() {
    useEffect(() => {
        LoggedInStatus();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <LoggedInStatus/>
            </Router>
        </ThemeProvider>
    );
}

export default App;