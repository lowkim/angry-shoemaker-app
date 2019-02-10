import axios from 'axios'

export default () => {
    return axios.create({
        // baseURL:'http://localhost:3000',
        baseURL:'https://e26a5754.ngrok.io',
    })
}