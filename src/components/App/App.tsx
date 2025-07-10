import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/tmdbApi';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import ReactPaginate from 'react-paginate';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
        queryKey: ['movies', searchTerm, page],
        queryFn: () => fetchMovies(searchTerm, page),
        enabled: !!searchTerm,
    });

    const handleSearch = (formData: FormData) => {
        const query = formData.get('query')?.toString().trim();
        if (!query) return;
        setPage(1);
        setSearchTerm(query);
    };

    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };

    useEffect(() => {
        if (isSuccess && data.results.length === 0) {
            toast('No movies found. Try a different search.');
        }
    }, [isSuccess, data]);

    return (
        <div>
            <Toaster position="top-right" />
            <SearchBar action={handleSearch} />

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}

            {isSuccess && data.results.length > 0 && (
                <>
                    <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
                    {data.total_pages > 1 && (
                        <ReactPaginate
                            pageCount={data.total_pages}
                            onPageChange={handlePageClick}
                            forcePage={page - 1}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    )}
                </>
            )}

            {isFetching && !isLoading && <Loader />}

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
}