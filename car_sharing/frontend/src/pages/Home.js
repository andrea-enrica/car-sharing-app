import React, {useEffect, useState} from 'react';
import Cards from "../components/Cards";
import FAQ from "../components/FAQ";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CarImage from '../images/car.jpg'
import CarService from "../services/CarService";
import {useTranslation} from "react-i18next";
import '../assets/i18n/i18n';
import {useLocation} from "react-router-dom";

export default function Home() {
    const [cars, setCars] = useState([]);
    const {t, i18n} = useTranslation();
    const [,setLanguage] =useState('');
    const location = useLocation();
    let loc= "";

    if(location.state !== undefined) {
        loc = location.state.searchKeyword;
    } else {
        loc= "";
    }

    useEffect(() => {
        i18n
            .changeLanguage(sessionStorage.getItem("state"))
            .then(() => setLanguage(sessionStorage.getItem("state")))
            .catch(err => console.log(err));
    },[i18n])

    useEffect(() => {
        const getCars = async () => {
            const res = await CarService.cardDisplayRequest();
            setCars(res.data);
        };
        getCars().then(r => r);
    }, [cars]);

    return (
        <div>
            <Typography variant="h4" marked="center" align="center" component="div" sx={{ mt: 6, mb: 4}}>
                <img src={CarImage} alt="old car"  width= "100%" height= "50%"/>
            </Typography>
            <Container component="section" sx={{ mt: 8, mb: 4, mr: 20, ml: 20}}>
                <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
                    <Container sx={{mr: 20, ml: 20}}>
                        <Typography  marked="center" align="center" variant="h2" component="h2" sx={{fontWeight: 500, fontFamily: 'B'}}>
                            {t('find your car')}
                        </Typography>
                       <div>
                           <Typography  marked="center" align="center" variant="h6" component="h6" sx={{fontWeight: 500, fontFamily: 'B', borderBottom: '10px solid #c8d8e4'}}>
                               {t('explore')}
                           </Typography>
                       </div>
                    </Container>
                    <Cards keyWord={loc} />
                    <FAQ/>
                </Box>
            </Container>
        </div>
    );
}