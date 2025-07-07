import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchMovies } from '../../services/tmdbApi';
import type { MovieResponse } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

export default function App() {
    const [page, setPage] = useState(1);
    const query = 'matrix';

    const { data, isLoading, isError } = useQuery<MovieResponse>({
        queryKey: ['movies', query, page],
        queryFn: () => fetchMovies(query, page),

    });

    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error occurred</p>}

            {data && (
                <>
                    <MovieGrid movies={data.results} onSelect={() => { }} />
                    {data.total_pages > 1 && (
                        <ReactPaginate
                            pageCount={data.total_pages}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageClick}
                            forcePage={page - 1}
                            containerClassName={css.pagination}
                            activeClassName={css.active}
                            nextLabel="→"
                            previousLabel="←"
                        />
                    )}
                </>
            )}
        </div>
    );
}