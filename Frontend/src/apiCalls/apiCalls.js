import axios from 'axios';
import { getLocalStorage } from './localstorage'

export const apiCall = (method, url, body, token) => {
    attachTokenToHeader(url)

    if (method === 'get') {
        if (token){
         attachTokenToHeader(url)
        }
         // attachTokenToHeader(url)
        return axios.get(url)
    }
    else if (method === 'post') {
        if (token){
            attachTokenToHeader(url)
        }
        // attachTokenToHeader(url)
        return axios.post(url, body)
    }
    else if (method === 'put') {
        if(token){
            attachTokenToHeader(url)
        }
        // attachTokenToHeader(url)
        return axios.put(url, body)
    }
    else {
        if (token){
            attachTokenToHeader(url)
        }
        // attachTokenToHeader(url)
        return axios.delete(url)
    }
}
function attachTokenToHeader(url) {
    if ((getLocalStorage('token'))) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${getLocalStorage('token') || ""}`
    }
}