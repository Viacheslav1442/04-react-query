import type { Movie } from '../../types/movie';

interface MovieGridProps {
    movies: Movie[];
    onSelect?: (movie: Movie) => void;
}

const BASE_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {movies.map(movie => (
                <div
                    key={movie.id}
                    onClick={() => onSelect?.(movie)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                    {movie.poster_path ? (
                        <img
                            src={`${BASE_IMAGE_PATH}${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                    ) : (
                        <div style={{ height: '300px', backgroundColor: '#ccc', borderRadius: '8px' }}>
                            No image
                        </div>
                    )}
                    <h3>{movie.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default MovieGrid;