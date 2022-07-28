import axios from 'axios'
import { IUser } from '../interfaces/IUser';
const API_URL = process.env.REACT_APP_API_URL

export const getUsers = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/api/user?page=${page}&size=${size}`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const postUsers = async (body: IUser) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/register`, body);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/user/all`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}