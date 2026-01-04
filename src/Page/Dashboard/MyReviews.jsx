import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }
        setLoading(true);
        axiosSecure
            .get('/reviews/my')
            .then((res) => setReviews(res.data || []))
            .catch((err) => console.error('Error fetching user reviews:', err))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    if (!user?.email) {
        return <p className="py-6">Please log in to view your reviews.</p>;
    }

    if (loading) {
        return (
            <div className="flex flex-wrap gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`rev-skel-${i}`} className="w-full sm:w-80 h-40 bg-base-300 animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (!reviews.length) {
        return <p className="py-6 text-base-content/70">You have not submitted any reviews yet.</p>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-primary mb-12 text-center">My Reviews</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id || `${review.movie?._id}-${review.createdAt}`}
                        className="shadow rounded-xl p-4 bg-base-200 flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-3">
                            {review.movie?.posterUrl ? (
                                <img
                                    src={review.movie.posterUrl}
                                    alt={review.movie?.title || 'Movie poster'}
                                    className="w-12 h-16 object-cover rounded-md"
                                />
                            ) : (
                                <div className="w-12 h-16 bg-base-300 rounded-md" />
                            )}
                            <div>
                                <h3 className="font-semibold text-base-content">{review.movie?.title || 'Unknown Movie'}</h3>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {Array.from({ length: Math.max(1, Math.round(review.rating || 0)) }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <p className="text-xs text-base-content/60">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <p className="text-sm text-base-content/80 leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
