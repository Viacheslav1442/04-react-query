interface SearchBarProps {
    query: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export default function SearchBar({ query, onChange, onSubmit }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={e => onChange(e.target.value)}
                placeholder="Search movies..."
            />
            <button type="submit">Search</button>
        </form>
    );
}
