import axios from "axios";

const RESERVATION_REST_API_URL = 'http://localhost:8080/reservations/reservation';
const RESERVATIONS_BY_USER_ID_REST_API_URL = 'http://localhost:8080/reservations/allReservationsByUserId';
const RESERVATIONS_BY_ID_CAR_REST_API_URL = 'http://localhost:8080/reservations/allReservationsByIdCar';

class ReservationService{
    addReservationRequest(reservation){
        let token
        if (sessionStorage.getItem('item') != null)
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.post(RESERVATION_REST_API_URL, reservation, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }, mode: 'no-cors'
        });
    }

    getAllReservationsByUserId(idUser) {
        let token
        if (sessionStorage.getItem('item') != null)
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.get( RESERVATIONS_BY_USER_ID_REST_API_URL + "?id_user=" + idUser, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }, mode: 'no-cors'
        });
    }

    getReservationByIdCar(id_car) {
        let token
        if (sessionStorage.getItem('item') != null)
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken']
        else
            token = null
        return axios.get( RESERVATIONS_BY_ID_CAR_REST_API_URL  + "?id_car=" + id_car, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Credentials': true
            }, mode: 'no-cors'
        });
    }
}
export default new ReservationService();