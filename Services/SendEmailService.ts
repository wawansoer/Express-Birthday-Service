import TaskService from './TaskService';
import axios from 'axios';
const API_URL = 'https://email-service.digitalenvision.com.au/send-email';


/**
 * This code snippet defines a function that sends emails using the Axios library and marks the corresponding task as sent using the TaskService module.
 * 
 * @param datas - An array of objects containing email data, including id, email, message, and sent status.
 * @returns None
 */

async function SendEmailService(datas: any) {

    for (const data of datas) {
        const { id, email, message, sent, } = data.dataValues;
        axios
            .post(API_URL,
                {
                    email: email,
                    subject: 'Happy Birthday!',
                    message: message,
                })
            .then((response) => {
                if (response.data.status === 'sent') {
                    TaskService.markTaskAsSentById(id)
                }
            })
            .catch((error) => {
                // If there's an error in the request or the server responds with an error status code
                console.error('Error sent email data:', error);
            });
    }

}

export default SendEmailService;