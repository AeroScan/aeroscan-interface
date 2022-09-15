import axios from 'axios';

export const api = axios.create(
    {
        baseURL: 'http://localhost:5619/', 
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


export const LoadCloud = async() => {
    // const response = await api.get('/loadCloud');
    // return response.data;
    return 'abb5ae70-b77a-11ec-b909-0242ac120002';
}