import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaPlusCircle } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';
import { auth } from '../firebase/firebase.init';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MovieAdd = () => {
    const [movieData, setMovieData] = useState({
        title: '',
        genre: '',
        releaseYear: '',
        director: '',
        cast: '',
        rating: '',
        duration: '',
        plotSummary: '',
        posterUrl: '',
        posterWideUrl: '',
        language: '',
        country: ''
    });

    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please log in to add a movie!');
            return;
        }
        const movieToSave = { ...movieData, addedBy: user.email };
        setLoading(true);
        try {
            const response = await axiosSecure.post('/movies/add', movieToSave);
            if (response.status === 200 || response.status === 201) {
                toast.success('Movie added successfully!');
                navigate('/');
            } else {
                toast.error('Failed to add movie');
            }
        } catch (err) {
            console.error('Error adding movie:', err);
            toast.error(err.response?.data?.message || 'Failed to add movie. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-10 bg-base-100">
            <div className="max-w-4xl  mx-4 md:mx-auto px-4 sm:px-6 lg:px-8 shadow-xl border border-secondary rounded-3xl p-6 sm:p-8">
                <div className="flex items-center mb-6">
                    <FaPlusCircle className="text-3xl text-primary mr-3" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                        Add a New Movie
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="title"
                            value={movieData.title}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Title"
                            required
                        />
                        <input
                            type="text"
                            name="genre"
                            value={movieData.genre}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Genre (e.g., Sci-Fi)"
                            required
                        />
                        <input
                            type="number"
                            name="releaseYear"
                            value={movieData.releaseYear}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Release Year"
                            required
                        />
                        <input
                            type="text"
                            name="director"
                            value={movieData.director}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Director"
                            required
                        />
                        <input
                            type="text"
                            name="cast"
                            value={movieData.cast}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Cast (comma separated)"
                            required
                        />
                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            value={movieData.rating}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Rating (1-10)"
                            required
                        />
                        <input
                            type="number"
                            name="duration"
                            value={movieData.duration}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Duration (in minutes)"
                            required
                        />
                        <input
                            type="text"
                            name="language"
                            value={movieData.language}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Language"
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            value={movieData.country}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Country"
                            required
                        />
                    </div>

                    <textarea
                        name="plotSummary"
                        value={movieData.plotSummary}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Plot Summary"
                        required
                    ></textarea>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="posterUrl"
                            value={movieData.posterUrl}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Poster Thumbnail URL"
                            required
                        />
                        <input
                            type="text"
                            name="posterWideUrl"
                            value={movieData.posterWideUrl}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Wide Poster URL"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full mt-4 ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Adding Movie...' : 'Add Movie'}
                    </button>
                </form>
            </div>
        </section>

    );
};

export default MovieAdd;
