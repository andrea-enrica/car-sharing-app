import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import CarService from "../services/CarService";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {useHistory} from "react-router-dom";
import FileService from "../services/FileService";
import {getImage} from "react-images-uploading/dist/utils";
import ReactDOM from "react-dom";

export default function CarDisplayCard(){
    const [cars, setCars] = useState([]);
    const [availableCars, setAvailableCars] = useState([]);
    const [availableFiles, setAvailableFiles] = useState([]);
    const [files, setFiles] = useState([])
    useEffect(() => {
        async function getCars(){
            await CarService.cardDisplayRequest().then(res => {
                setCars(res.data);
            });
        };
        getCars().then();
    }, []);

    useEffect(() => {
        let arrayOfCars = [...availableCars];
        if (cars.length !== 0) {
            cars.map((car) => {
                console.log("AVAILABLE = " +car.available)
                if(car.available === 'true')
                {
                    arrayOfCars.push(car);

                }

                setAvailableCars(arrayOfCars);
            })
        }
    },[cars]);
    let pathForPictures
    const [carsImage,setCarsImage] = useState([])
    let imageURL = []


    useEffect(() => {  async function getFiles() {
        if (cars.length !== 0) {
            for (let i = 0; i < cars.length; i++) {
                await FileService.getFileName(cars[i].plate_number).then(res => {
                    pathForPictures = res.data
                    console.log("path ====" + pathForPictures)
                    imageURL[i] = "http://localhost:8080/pictures/files/" + pathForPictures
                    console.log("IMAGE URL " + imageURL[i])
                    setFiles(res.data)
                });
            }
        }
    }
        getFiles();
    },[cars])
    //let imageURL2 = []

    useEffect(() => {
        let url
        let imageURL2 = [...carsImage]
        if(files.length !== 0 )
        {
            files.map(file => (
                url = "http://localhost:8080/pictures/files/" + file,
                imageURL2.push(url),
                setCarsImage(imageURL2)))


        }
    },[files])

    // useEffect(() => {
    //     let arrayOfFiles = [...availableFiles];
    //     if (files.length !== 0) {
    //         files.map((file) => {
    //             arrayOfFiles.push(file);
    //             console.log("FILE ====" + file)
    //             setAvailableFiles(arrayOfFiles);
    //         })
    //     }
    // },[]);


    const history = useHistory();
    const handleClick = (car) => history.push('/carDetails',{car: car});
    return  (
        <Container component="section" sx={{ mt: 8, mb: 4, ml: 15}} sm={7} xs={5}>

            <Grid className={"grid-principal"} container columns={3}  gridRow={4} item xs={6} sm={7} md={7} sx={{
                flex: '1 0 auto',
                margin: '0 8px',
                position: 'relative',
                textAlign: 'center',
            }}>
                {availableCars.map((car,index) =>
                        <Card  key={cars.indexOf(car)} className={"card"} marked="center" align="center" sx={{ maxWidth: 200, maxHeight: 400,

                            borderRadius: '8px',
                            boxShadow: '2px 4px 0 rgb(35 31 32 / 20%), 0 0 1px 0 rgb(35 31 32 / 10%)',
                            backgroundColor: 'white',
                            mr: 1,
                            ml: 1,
                            mb: 2,

                        }}>
                            <CardHeader

                                avatar = {
                                    <Avatar sx={{ bgcolor: red[500],  height:'25px', width: '25px', position:'relative', top:'-15px' }} aria-label="car"/>
                                }
                                title = {
                                    <Typography yposition={'relative'} style={{fontWeight:"bold"}} top={'-15px'} fontSize={'13px'}>
                                        {car.brand} {car.model}
                                    </Typography>
                                }
                                subheader = {
                                    <Typography  position={'relative'} top={'5px'}  fontSize={'11px'}>
                                        {car.city}
                                    </Typography>
                                }
                            />
                            <CardMedia

                                component="img"
                                height="100"

                                image={carsImage[index]}
                                {...console.log("CAR IMAGE" + carsImage[index])}
                                alt="Car"
                                style={{
                                    position: 'relative',
                                    color: 'white',
                                    top: '15px',
                                    left: '100px',
                                    transform: 'translateX(-50%)',
                                    width:'190px'}}
                            />

                            <Typography position={'relative'} top={'14px'} left={'70px'}  color={'red'} fontSize={'15px'}>
                                {car.daily_rental_price} €
                            </Typography>
                            <CardActions disableSpacing>
                                <div>
                                    <Button variant="contained"  style={{
                                        position: 'relative',
                                        top:'7px',
                                        bottom: '20px',
                                        left: '40px',
                                        width:'110px',
                                        fontSize:'10px'}} onClick={() => handleClick(car)} >More details</Button>
                                </div>
                            </CardActions>
                        </Card>

                    )
                }
            </Grid>
        </Container>
    );

}



