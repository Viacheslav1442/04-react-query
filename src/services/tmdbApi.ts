import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchMovies = async (query: string, page = 1): Promise<{ results: Movie[]; total_pages: number }> => {
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