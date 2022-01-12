import React, {useEffect, useState} from 'react';
import Cards from "../components/Cards";
import FAQ from "../components/FAQ";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CarImage from '../images/car.jpg'
import CarService from "../services/CarService";

export default function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars= async () => {
            const res = await CarService.cardDisplayRequest();
            setCars(res.data);
        };
        getCars().then(r => r);
    }, []);

    return (
        <div>
            <Typography variant="h4" marked="center" align="center" component="div" sx={{ mt: 6, mb: 4}}>
                <img src={CarImage} alt="old car"  width= "100%"
                     height= "50%"
                />
            </Typography>
            <Container component="section" sx={{ mt: 8, mb: 4, mr: 20, ml: 20}}>
                <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
                    <Container sx={{mr: 20, ml: 20}}>
                        <Typography  marked="center" align="center" variant="h2" component="h2" sx={{fontWeight: 500, fontFamily: 'B'}}>
                            Find your car
                        </Typography>
                       <div>
                           <Typography  marked="center" align="center" variant="h6" component="h6" sx={{fontWeight: 500, fontFamily: 'B', borderBottom: '10px solid #c8d8e4'}}>
                               Explore the world's best car sharing marketplace
                           </Typography>
                       </div>
                    </Container>
                    <Cards/>
                    <FAQ/>
                </Box>
            </Container>
        </div>
    )
}