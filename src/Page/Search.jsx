import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';

const Search = () => {
    const axiosInstance = useAxios();
    const [searchTitle, setSearchTitle] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovies = async () => {
        if (!searchTitle.trim()) {
            setError('Please enter a movie title to search.');
            setMovies([]);
            return;
        }
        try {
            setLoading(true);
            setError('');
            const res = await axiosInstance.get('/movies/search', {
                params: { title: searchTitle },
            });
            setMovies(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error('Search error:', error.response || error.message);
            setError(
                error.response?.data?.message || 'Failed to fetch movies. Please try again.'
            );
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-5">Search Movies</h2>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="input input-bordered flex-1 w-full"
                />
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Search
                </button>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-5">
                    {movies.length === 0 && !error ? (
                        <p>No movies found.</p>
                    ) : (
                        movies.map((movie) => (
                            <a
                                key={movie._id}
                                href={`/movies/${movie._id}`}
                                className="shadow duration-300 hover:scale-105 hover:shadow-2xl block"
                            >
                                <div
                                    className="relative w-40 sm:w-48 md:w-52 h-72 sm:h-80 md:h-96 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${movie.posterUrl || 'https://via.placeholder.com/200x300'})`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <div className="absolute bottom-0 px-2">
                                        <p>{movie.title || 'Unknown Title'}</p>
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            )}
        </div>

    );
};

export default Search;