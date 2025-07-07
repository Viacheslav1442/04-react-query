import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchMovies } from '../../services/tmdbApi';
import type { Movie, MovieResponse } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';
import ReactPaginate from 'react-paginate';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';

export default function App() {
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState(query);
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // ✅

    const { data, isLoading, isError } = useQuery<MovieResponse>({
        queryKey: ['movies', searchTerm, page],
        queryFn: () => fetchMovies(searchTerm, page),
    });

    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };

    const handleSearch = () => {
        setPage(1);
        setSearchTerm(query);
    };

    return (
        <div>
            <SearchBar
                query={query}
                onChange={setQuery}
                onSubmit={handleSearch}
            />

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error occurred</p>}

            {data && (
                <>
                    <MovieGrid
                        movies={data.results}
                        onSelect={setSelectedMovie} // ✅
                    />
                    {data.total_pages > 1 && (
                        <ReactPaginate
                            pageCount={data.total_pages}
                            pageRangeDisplayed={10}
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

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
}


