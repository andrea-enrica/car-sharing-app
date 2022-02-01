
import emailjs from '@emailjs/browser';

class MailService {
    sendMailToCustomerRequest(customerEmailDetails, host_name, host_mail, hostEmailDetails, customer_name) {
        let customerMail, username;
        let service_id = "service_a3vii1u";
        let customer_template_id = "template_z0b5mwj";
        let host_template_id = "template_jj8h51m";

        (function () {
            emailjs.init("user_EAUpaMA6L7AnFVj5QKF62");
        })();

        if (sessionStorage.getItem('item') != null) {
            customerMail = JSON.parse(sessionStorage.getItem('item'))['email'];
            username = JSON.parse(sessionStorage.getItem('item'))['username'];

        } else {
            customerMail = null;
            username = null;
        }

        const customerTemplateParams = {
            sent_to: customerMail,
            to_name: username,
            start_date: customerEmailDetails.start_date,
            start_time: customerEmailDetails.start_time,
            end_date: customerEmailDetails.end_date,
            end_time: customerEmailDetails.end_time,
            car_brand: customerEmailDetails.brand,
            car_model: customerEmailDetails.model,
            plate_number: customerEmailDetails.plate_number,
            seats: customerEmailDetails.seats,
            car_address: customerEmailDetails.address,
            car_city: customerEmailDetails.city,
            host_mail: host_mail,
            host_name: host_name,
            total_price: customerEmailDetails.total_reservation_price
        };

        emailjs.send(service_id, customer_template_id, customerTemplateParams).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

        const hostTemplateParams = {
            sent_to: host_mail,
            to_name: host_name,
            start_date: hostEmailDetails.start_date,
            start_time: hostEmailDetails.start_time,
            end_date: hostEmailDetails.end_date,
            end_time: hostEmailDetails.end_time,
            car_brand: hostEmailDetails.brand,
            car_model: hostEmailDetails.model,
            plate_number: hostEmailDetails.plate_number,
            customer_mail: customerMail,
            customer_name: customer_name,
            total_price: hostEmailDetails.total_reservation_price
        };

        emailjs.send(service_id, host_template_id, hostTemplateParams).then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
    }
}
export default new MailService();