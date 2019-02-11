import axios from 'axios'

export default () => {
    return axios.create({
        baseURL:'http://localhost:3000',
        // baseURL:'https://41a270e3.ngrok.io',
    })
}