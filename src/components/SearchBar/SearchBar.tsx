import { toast } from 'react-hot-toast';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const action = (formData: FormData) => {
        const query = formData.get('query')?.toString().trim();

        if (!query) {
            toast.error('Please enter a search query');
            return;
        }

        onSubmit(query);
    };

    return (
        <form action={action}>
            <input type="text" name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
}