// src/Page/MovieEdit.jsx (unchanged, for reference)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { auth } from '../firebase/firebase.init';
import toast from 'react-hot-toast';
import Loading from '../components/Loading/Loading';

const MovieEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const user = auth.currentUser;

    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if (!user) {
            toast.error('Please log in!');
            navigate('/login');
            return;
        }
        const fetchMovie = async () => {
            try {
                const response = await axiosSecure.get(`/movies/${id}`);
                setMovieData(response.data);
                setCanEdit(response.data.addedBy === user.email);
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to load movie');
                navigate('/');
            }
        };
        fetchMovie();
    }, [id, axiosSecure, navigate, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please log in!');
            return;
        }
        if (!canEdit) {
            toast.error('You can only edit your own movies!');
            return;
        }
        setLoading(true);
        try {
            const { _id, ...updateData } = movieData;
            const response = await axiosSecure.patch(`/movies/update/${id}`, updateData);
            if (response.status === 200) {
                toast.success('Movie updated successfully!');
                navigate(`/movies/${id}`);
            } else {
                toast.error('Failed to update movie');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update movie');
        } finally {
            setLoading(false);
        }
    };

    if (!movieData) return <Loading />;

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xl border border-secondary rounded-3xl p-8">
                <div className="flex items-center mb-6">
                    <FaEdit className="text-3xl text-primary mr-3" />
                    <h1 className="text-3xl font-bold text-base-content">Edit Movie</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4" disabled={!canEdit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="title"
                            value={movieData.title}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Title"
                            required
                            disabled={!canEdit}
                        />
                        <input
                            type="text"
                            name="genre"
                            value={movieData.genre}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Genre (e.g., Action, Thriller)"
                            required
                            disabled={!canEdit}
                        />
                        <input
                            type="number"
                            name="releaseYear"
                            value={movieData.releaseYear}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Release Year"
                            required
                            disabled={!canEdit}
                        />
                        <input
                            type="text"
                            name="director"
                            value={movieData.director}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Director"
                            required
                            disabled={!canEdit}
                        />
                        <input
                            type="text"
                            name="cast"
                            value={movieData.cast}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Cast (comma separated)"
                            required
                            disabled={!canEdit}
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
                            disabled={!canEdit}
                        />
                        <input
                            type="number"
                            name="duration"
                            value={movieData.duration}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Duration (in minutes)"
                            required
                            disabled={!canEdit}
                        />
                        <input
                            type="text"
                            name="language"
                            value={movieData.language}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Language"
                            required
                            disabled={!canEdit}
                        />
                        <input
                            type="text"
                            name="country"
                            value={movieData.country}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Country"
                            required
                            disabled={!canEdit}
                        />
                    </div>
                    <textarea
                        name="plotSummary"
                        value={movieData.plotSummary}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Plot Summary"
                        required
                        disabled={!canEdit}
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
                            disabled={!canEdit}
                        />
                        <input
                            type="text"
                            name="posterWideUrl"
                            value={movieData.posterWideUrl}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Wide Poster URL"
                            required
                            disabled={!canEdit}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full mt-4 ${loading ? 'loading' : ''}`}
                        disabled={loading || !canEdit}
                    >
                        {loading ? 'Updating Movie...' : 'Update Movie'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default MovieEdit;