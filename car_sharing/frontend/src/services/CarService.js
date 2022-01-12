import axios from "axios";

const CAR_REST_API_URL = 'http://localhost:8080/cars/car';
const CARD_DISPLAY_REST_API_URL= 'http://localhost:8080/cars/carget';
const CARD_SEND_ID_REST_API_URL= 'http://localhost:8080/cars/carGetById';
const CAR_OF_USER_REST_API = 'http://localhost:8080/cars/id-user';

class CarService {

    addCarRequest(item) {
        let token
        if (localStorage.getItem('item') != null)
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.post(CAR_REST_API_URL, item, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }, mode: 'no-cors'
        });
    }

    cardDisplayRequest() {
        let token
        if (localStorage.getItem('item') != null)
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.get(CARD_DISPLAY_REST_API_URL,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }, mode: 'no-cors'
        }
        );
    }

    cardSendIdRequest(item) {
        let token
        if (localStorage.getItem('item') != null)
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.get(CARD_SEND_ID_REST_API_URL + "?id_car=" + item, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }, mode: 'no-cors'
        });
    }

    getCarOfUser(id_user) {
        let token
        if (localStorage.getItem('item') != null)
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        else
            token = null

       return axios.get(CAR_OF_USER_REST_API + "?id_user=" + id_user, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }, mode: 'no-cors'
       });
    }
}
export default new CarService();