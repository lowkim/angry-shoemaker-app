import axios from 'axios'

export default () => {
    return axios.create({
        baseURL:'http://localhost:3000',
        // baseURL:'https://6051857e.ngrok.io',
    })
}