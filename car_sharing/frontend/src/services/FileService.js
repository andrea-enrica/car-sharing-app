import axios from "axios";
import cors from "cors";
import * as Path from "path";

class FileService {

    upload(file, plate_number) {
        let formData = new FormData();
        formData.append('file', file);
        let token

        if(localStorage.getItem('item') != null)
        {
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        }
        else
            token = null

        axios.post("http://localhost:8080/pictures/platenumber",plate_number,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            },
            mode: 'no-cors'
        }).then(response => console.log(response.data));

        return axios.post("http://localhost:8080/pictures/upload",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token
            },
            mode: 'no-cors'
        }).then(response => console.log(response.data));

    }
    getFileName(plate_number){
        let token
        if(localStorage.getItem('item') != null)
        {
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        }
        else
            token = null

        return axios.get("http://localhost:8080/pictures/files-by-plate-number/?plate_number=" + plate_number,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            },
            mode: 'no-cors'
        });
    }
    getFileByName(filename){
        let token
        if(localStorage.getItem('item') != null)
        {
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        }
        else
            token = null
        return axios.get("http://localhost:8080/pictures/files/" + filename,{
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "multipart/form-data",
                'Authorization': 'Bearer ' + token,
            },
            mode: 'no-cors'
        });
    }
    // getImage(){
    //     return axios.get("http://localhost:8080/pictures/files/car.jpg",{
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             "Accept": "multipart/form-data",
    //         },
    //         mode: 'no-cors'
    //     });
    // }

}


    export default new FileService();