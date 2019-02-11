import axios from 'axios'

export default () => {
    return axios.create({
        baseURL:'http://localhost:3000',
        // baseURL:'https://6d67ac87.ngrok.io',
    })
}