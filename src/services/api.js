
import axios from 'axios';

const API_BASE_URL = 'https://dummy-api-topaz.vercel.app';

export const fetchInstruments = async () => {
    return axios.get(`${API_BASE_URL}/instruments`);
};

export const fetchPortfolio = async () => {
    return axios.get(`${API_BASE_URL}/portfolio`);
};

export const searchAssets = async (query) => {
    return axios.get(`${API_BASE_URL}/search?query=${query}`);
};

export const placeOrder = async (order) => {
    return axios.post(`${API_BASE_URL}/orders`, order);
};

export const fetchOrders = async () => {
    return axios.get(`${API_BASE_URL}/orders`);
};
