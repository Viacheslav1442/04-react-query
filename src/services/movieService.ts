import { http } from "../libs/api-service.ts";
import type { Movie } from "../types/movie.ts";

// Отримуємо токен з .env змінної
const BEARER_KEY = import.meta.env.VITE_TMDB_API_TOKEN;

interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export const fetchMovie = async (
    query: string,
    page: number = 1
): Promise<MoviesResponse> => {
    const urlSearchParams = new URLSearchParams({
        query,
        page: page.toString(), // Перетворюємо в рядок для URL
    });

    const { data } = await http.get<MoviesResponse>(
        `/search/movie?${urlSearchParams.toString()}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${BEARER_KEY}`,
            },
        }
    );

    return data;
};
