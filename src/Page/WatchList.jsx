// src/pages/MyWatchlist.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { auth } from '../firebase/firebase.init';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaTrash, FaPlay } from 'react-icons/fa';

const Watchlist = () => {
    
    const axiosSecure = useAxiosSecure();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            axiosSecure
                .get('/watchlist/my')
                .then((res) => setMovies(res.data))
                .catch(() => toast.error('Failed to load watchlist'))
                .finally(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    const handleRemove = async (id) => {
        Swal.fire({
            title: 'Remove from Watchlist?',
            text: 'This will delete the movie from your watchlist.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/watchlist/${id}`);
                    setMovies(movies.filter((m) => m._id !== id));
                    toast.success('Removed from watchlist');
                } catch (err) {
                    toast.error('Failed to remove from watchlist', err);
                }
            }
        });
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!user) return <p className="text-center py-10">Please log in to view your watchlist.</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">🎬 My Watchlist</h1>
            {movies.length === 0 ? (
                <p className="text-center text-lg text-base-content">No movies in your watchlist.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie._id}
                            className="card bg-base-200 shadow-xl hover:scale-105 transition-transform"
                        >
                            <figure>
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{movie.title}</h2>
                                <p>{movie.genre} • {movie.releaseYear}</p>
                                <div className="card-actions justify-between mt-3">
                                    <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm">
                                        <FaPlay /> Watch
                                    </Link>
                                    <button
                                        onClick={() => handleRemove(movie._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
