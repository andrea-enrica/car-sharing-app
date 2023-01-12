import axios from "axios";

class FileService {
    upload(file, plate_number) {
        let formData = new FormData();
        formData.append('file', file);
        let token;

        if(sessionStorage.getItem('item') != null) {
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken'];
        } else {
            token = null;
        }
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
        if(sessionStorage.getItem('item') != null)
        {
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken'];
        }
        else
            token = null;

        return axios.get("http://localhost:8080/pictures/files-by-plate-number/?plate_number=" + plate_number,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            },
            mode: 'no-cors'
        });
    }

    getAllFilesByPlateNumber(plate_number){
        let token;
        if(sessionStorage.getItem('item') != null)
        {
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken'];
        }
        else
            token = null;

        return axios.get("http://localhost:8080/pictures/all-files-by-plate-number/?plate_number=" + plate_number,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            },
            mode: 'no-cors'
        });
    }


    getFilesByPlateNumber(plate_number){
        let token;
        if(sessionStorage.getItem('item') != null)
        {
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken'];
        }
        else
            token = null;

        return axios.get("http://localhost:8080/pictures/files-by-plate-number/?plate_number=" + plate_number,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            },
            mode: 'no-cors'
        });
    }
}
export default new FileService();