import axios from 'axios';
import type { MovieResponse } from '../types/movie';

const BEARER_TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        params: {
            query,
            page,
        },
    });

    return response.data;
};