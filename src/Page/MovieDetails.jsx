// src/Page/MovieDetail.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { FaStar, FaPlay, FaFilm, FaEdit, FaTrash, FaBookmark } from 'react-icons/fa';
import 'animate.css';
import useAxios from '../hooks/useAxios';
import { auth } from '../firebase/firebase.init';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ comment: '', rating: '' });
    const [inWatchlist, setInWatchlist] = useState(false);
    const [error, setError] = useState(null);
    const axiosMain = useAxios();
    const user = auth.currentUser;
    const sectionRefs = useRef([]);
    const axiosSecure = useAxiosSecure();


    // Fetch movie details, reviews, and watchlist status
    useEffect(() => {
        // Movie details
        axiosMain
            .get(`/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => setError(err.response?.data?.message || 'Failed to load movie details'));

        // Reviews
        axiosMain
            .get(`/reviews/${id}`)
            .then((res) => setReviews(res.data))
            .catch((err) => console.error('Failed to load reviews:', err));

        // Watchlist status
        if (user) {
            axiosSecure.get(`/watchlist/check/${id}`)
                .then(res => setInWatchlist(res.data.inWatchlist))
                .catch(err => console.log(err));
        }
    }, [axiosMain, id, user, axiosSecure]);

    // IntersectionObserver for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        entry.target.style.animationDelay = `${index * 0.2}s`;
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, [movie]); // Add movie to ensure sections are observed after data loads

    // Handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please log in to submit a review');
            navigate('/login');
            return;
        }
        const ratingNum = Number(newReview.rating);
        if (!newReview.comment || !ratingNum || ratingNum < 1 || ratingNum > 10) {
            toast.error('Please provide a comment and a rating between 1 and 10');
            return;
        }
        try {
            const response = await axiosSecure.post('/reviews', {
                movieId: id,
                userEmail: user.email,
                comment: newReview.comment,
                rating: ratingNum,
            });
            setReviews([{ _id: response.data.insertedId, userEmail: user.email, comment: newReview.comment, rating: ratingNum, createdAt: new Date() }, ...reviews]);
            setNewReview({ comment: '', rating: '' });
            toast.success('Review submitted successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit review');
        }
    };

    // Handle watchlist toggle
    const handleWatchlistToggle = async () => {
        console.log(user.email);
        if (!user) {
            toast.error('Please log in to add to watchlist');
            navigate('/login');
            return;
        }
        try {
            await axiosSecure.post('/watchlist', { movieId: id, userEmail: user.email });

            setInWatchlist(true);

            toast.success('Added to watchlist');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add to watchlist');
        }
    };

    // handleDelete
 

    const handleDelete = async () => {
        if (!user) {
            toast.error('Please log in to delete');
            navigate('/login');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/movies/${id}`);
                    await Swal.fire({
                        title: 'Deleted!',
                        text: 'Your movie has been deleted.',
                        icon: 'success',
                    });
                    toast.success('Movie deleted successfully');
                    navigate('/movies/my-collection');
                } catch (err) {
                    toast.error(err.response?.data?.message || 'Failed to delete movie');
                }
            }
        });
    };

    if (error) {
        return (
            <section className="py-12 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xl text-error">{error}</p>
                </div>
            </section>
        );
    }

    if (!movie) {
        return (
            <section className="py-12 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xl text-base-content">Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <div className="bg-base-100 min-h-screen">
            {/* Hero Section */}
            <section
                ref={(el) => (sectionRefs.current[0] = el)}
                className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${movie.posterWideUrl})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex flex-col justify-center items-start h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{movie.title}</h1>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <div className="btn btn-sm btn-outline border-white text-white hover:btn-disabled cursor-default">
                            <FaStar className="text-yellow-500" />
                            <span className="text-xs font-medium text-yellow-500">{movie.rating}</span>
                        </div>
                        <div className="btn btn-sm btn-outline border-white text-white hover:btn-disabled cursor-default">
                            <span className="text-xs font-medium">{movie.releaseYear}</span>
                        </div>
                        <div className="btn btn-sm btn-outline border-white text-white hover:btn-disabled cursor-default">
                            <span className="text-xs font-medium">{movie.genre}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="btn btn-primary">
                            <FaPlay className="mr-2" /> Watch Now
                        </button>
                        <button
                            className={`btn ${inWatchlist ? 'btn-disabled' : 'btn-primary'}`}
                            onClick={handleWatchlistToggle}
                            disabled={inWatchlist}
                        >
                            <FaBookmark className="mr-2" /> {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                        </button>
                        {user && user.email === movie.addedBy && (
                            <>
                                <Link to={`/movies/update/${id}`} className="btn btn-primary">
                                    <FaEdit className="mr-2" /> Edit
                                </Link>
                                <button className="btn btn-error" onClick={handleDelete}>
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>
            {/* Details Section */}
            <section ref={(el) => (sectionRefs.current[1] = el)} className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="shadow-xl border border-secondary rounded-3xl p-6 bg-linear-to-b from-base-200 to-base-300 transition-transform duration-300">
                        <div className="flex items-center mb-4">
                            <FaFilm className="text-3xl text-primary mr-2" />
                            <h2 className="text-2xl font-semibold text-base-content">Movie Details</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <tbody>
                                    <tr>
                                        <th className="text-base-content">Title</th>
                                        <td className="text-base-content">{movie.title}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Genre</th>
                                        <td className="text-base-content">{movie.genre}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Release Year</th>
                                        <td className="text-base-content">{movie.releaseYear}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Director</th>
                                        <td className="text-base-content">{movie.director}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Cast</th>
                                        <td className="text-base-content">{movie.cast}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Rating</th>
                                        <td className="text-base-content">{movie.rating}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Duration</th>
                                        <td className="text-base-content">{movie.duration} minutes</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Plot Summary</th>
                                        <td className="text-base-content">{movie.plotSummary}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Language</th>
                                        <td className="text-base-content">{movie.language}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Country</th>
                                        <td className="text-base-content">{movie.country}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-base-content">Added By</th>
                                        <td className="text-base-content">{movie.addedBy}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {/* Reviews Section */}
            <section ref={(el) => (sectionRefs.current[2] = el)} className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="shadow-xl border border-secondary rounded-3xl p-6 bg-linear-to-b from-base-200 to-base-300 transition-transform duration-300">
                        <div className="flex items-center mb-4">
                            <FaStar className="text-3xl text-primary mr-2" />
                            <h2 className="text-2xl font-semibold text-base-content">User Reviews</h2>
                        </div>
                        {user ? (
                            <form onSubmit={handleReviewSubmit} className="mb-6">
                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text text-base-content">Your Review</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered"
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base-content">Rating (1-10)</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        className="input input-bordered"
                                        value={newReview.rating}
                                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-4">
                                    Submit Review
                                </button>
                            </form>
                        ) : (
                            <p className="text-base-content">Please log in to submit a review.</p>
                        )}
                        <div className="space-y-4">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review._id} className="border-b border-secondary pb-2">
                                        <p className="text-base-content">
                                            <strong>{review.userEmail}</strong> (Rating: {review.rating}/10)
                                        </p>
                                        <p className="text-base-content/80">{review.comment}</p>
                                        <p className="text-sm text-base-content/60">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-base-content">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetail;