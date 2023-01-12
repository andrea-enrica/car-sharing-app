import * as React from "react";
import {useEffect, useState} from "react";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import FileService from "../services/FileService";

export default function CarouselCarDetails({keyWord}){
    let pathForPictures
    const [carsImage,setCarsImage] = useState([])
    let imageURL = []
    const [cars] = useState([]);
    const [files, setFiles] = useState([])

    useEffect(() => {
        async function getFiles() {
        await FileService.getAllFilesByPlateNumber(keyWord.plate_number).then(res => {
            pathForPictures = res.data
            imageURL = "http://localhost:8080/pictures/files/" + pathForPictures
            if(res.data.length !== 0)
            {
                setFiles(res.data)
            }else{
                let defaultImage = []
                defaultImage[0] = "/images/defaultImage.png"
                setFiles(defaultImage)
            }
        });
    }
        getFiles().then(r => r);
    },[cars])

    useEffect(() => {
        let url
        let imageURL2 = [...carsImage]
        if(files.length !== 0){

            for(let i = 0; i < files.length; i++){
                if(files[i] !== "/images/defaultImage.png")
                {
                    url = "http://localhost:8080/pictures/files/" + files[i]
                }
                else {
                    url = files[i]
                }
                imageURL2.push(url)
                setCarsImage(imageURL2)
            }
        }
    },[files])

    return (
        <Carousel position={"absolute"}  style={{width: "100%", height:"15%"}} >
            {carsImage.map((car,index) =>
                <div>
                    <img src={carsImage[index]} />
                </div>)
            }
        </Carousel>
    )
}
