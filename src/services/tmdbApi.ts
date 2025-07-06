import axios from 'axios';
import { MovieResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_KEY,
            query,
            page,
        },
    });
    return response.data;
};