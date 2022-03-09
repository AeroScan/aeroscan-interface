import axios from 'axios';
import t from 'typy';
import { SaveToken } from './util';

export const api = axios.create(
    {
        baseURL: '', 
    }
)

export const LoginApi = async(email, password) => {
    // const headerParams = {
    //     headers: {
    //         'Content-Type': 'application/json'  
    //     }
    // }
    // const body = {
    //     login: {
    //         email, 
    //         password
    //     }
    // }
    // await api.post('/login', body, headerParams)
    // .then(response => {
    //     SaveToken(t(response, 'data.token').safeString)
    //     }
    // )
}