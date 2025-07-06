import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchMovies } from '../../services/tmdbApi';
import MovieGrid from '../MovieGrid/MovieGrid';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

export default function App() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('matrix'); // або з SearchBar

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movies', query, page],
        queryFn: () => fetchMovies(query, page),
        keepPreviousData: true,
    });

    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };

    return (
        <div>
            {/* SearchBar тут, якщо є */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error...</p>}
            {data && (
                <>
                    <MovieGrid movies={data.results} />
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