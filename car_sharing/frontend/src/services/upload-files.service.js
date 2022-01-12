import axios from "axios";

class UploadFilesService {

    upload(file, plate_number) {
        let formData = new FormData();
        formData.append('file', file);

        let token
        console.log("LOCAL STORAGE = " + localStorage.getItem('item'))
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

}


    export default new UploadFilesService();