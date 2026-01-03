import React, { useEffect, useState } from 'react';
// adjust path if needed
import { FaStar } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const axiosMain = useAxios();

    useEffect(() => {
        axiosMain
            .get('/reviews-home')
            .then(res => setReviews(res.data))
            .catch(err => console.error('Error fetching reviews:', err));
    }, [axiosMain]);

    if (!reviews.length) {
        return <p className="text-center py-8">No reviews yet.</p>;
    }

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-extrabold text-primary mb-12 text-center">
                    Latest Reviews
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id.$oid}
                            className="shadow-lg rounded-xl p-6 flex flex-col gap-4 bg-linear-to-b from-base-200 to-base-300"
                        >
                            <div className="flex items-center gap-3">
                                {review.movie?.posterUrl && (
                                    <img
                                        src={review.movie.posterUrl}
                                        alt={review.movie.title}
                                        className="w-12 h-16 object-cover rounded-md"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold">{review.movie?.title || 'Unknown Movie'}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-base-content/80">{review.comment}</p>
                            <span className="text-xs text-base-content/60">
                                by {review.userEmail.split('@')[0]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
