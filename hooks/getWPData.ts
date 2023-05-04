import axios from 'axios';

export const getWPData = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
    };