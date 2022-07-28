import axios from 'axios'
import { IIllness } from '../interfaces/IIllness';
const API_URL = process.env.REACT_APP_API_URL

export const getIllness = async (id: string, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/api/illness/all/${id}?page=${page}&size=${size}`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const postIllness = async (body: IIllness) => {
    try {
        const response = await axios.post(`${API_URL}/api/illness/register`, body);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const getIllnessById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/illness/${id}`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}