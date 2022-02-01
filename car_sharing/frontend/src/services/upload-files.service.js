import axios from "axios";

class UploadFilesService {

    upload(file, plate_number) {
        let formData = new FormData();
        formData.append('file', file);

        let token
        if(sessionStorage.getItem('item') != null)
        {
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken'];
        }
        else
            token = null;

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