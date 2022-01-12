import axios from "axios";
const SIGNUP_REST_API_URL = 'http://localhost:8080/api/auth/signup';
const LOGIN_REST_API_URL = 'http://localhost:8080/api/auth/signin';
const USER_BY_ID_REST_API_URL = 'http://localhost:8080/users/userById';
const USER_BY_ID_CAR_REST_API_URL = 'http://localhost:8080/users/userByIdCar';

class UserService {
    singUpRequest(item) {
        return axios.post(SIGNUP_REST_API_URL, item, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, mode: 'no-cors'
        });
    }

    logInRequest(item) {
        return axios.post(LOGIN_REST_API_URL, item, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, mode: 'no-cors', responseType: "json"
        });
    }

    getUserByIdRequest(id) {
        let token
        if (localStorage.getItem('item') != null)
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.get(USER_BY_ID_REST_API_URL + "?id_user=" + id, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Credentials': true
            }, mode: 'no-cors'
        });
    }

    getUserByIdCarRequest(id_car) {
        let token
        if (localStorage.getItem('item') != null)
            token = JSON.parse(localStorage.getItem('item'))['accessToken']
        else
            token = null

        return axios.get(USER_BY_ID_CAR_REST_API_URL + "?id_car=" + id_car, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Credentials': true
            }, mode: 'no-cors'
        });
    }
}
export default new UserService();