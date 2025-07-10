import { toast } from 'react-hot-toast';

interface SearchBarProps {
    action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const query = formData.get('query')?.toString().trim();

        if (!query) {
            toast.error('Please enter a search query');
            return;
        }

        action(formData);
        form.reset(); // скидання поля
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
}