import axios from 'axios'

const BASE_URL = "http://localhost:5555"


export const publicReq = axios.create({
   baseURL:BASE_URL,
})

