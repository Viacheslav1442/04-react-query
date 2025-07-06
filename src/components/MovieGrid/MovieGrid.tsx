import type { Movie } from '../../types/movie';

interface MovieGridProps {
    movies: Movie[];
    onSelect?: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id} onClick={() => onSelect?.(movie)}>
                    {movie.title}
                </div>
            ))}
        </div>
    );
};

export default MovieGrid;