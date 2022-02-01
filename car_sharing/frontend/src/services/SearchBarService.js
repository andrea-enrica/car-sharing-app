import axios from "axios";

const SEARCH_BAR_REST_API_URL = 'http://localhost:8080/cars/search';

class ReservationService {
    getSearchRequest(keyword) {
        let token
        if (sessionStorage.getItem('item') != null)
            token = JSON.parse(sessionStorage.getItem('item'))['accessToken']
        else
            token = null
        return axios.get(SEARCH_BAR_REST_API_URL + "?keyword=" + keyword, {
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