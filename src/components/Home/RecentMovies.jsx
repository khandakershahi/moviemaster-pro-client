import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router";

const RecentMovies = () => {
    const [recentMovies, setRecentMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosTopMovie = useAxios();

    useEffect(() => {
        setLoading(true);
        axiosTopMovie
            .get("/movie-recent")
            .then((res) => {
                setRecentMovies(res.data);
            })
            .catch((err) => console.error("Error fetching recent movies:", err))
            .finally(() => setLoading(false));
    }, [axiosTopMovie]);

    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

 
    if (!recentMovies.length) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-gray-500">No recent movies found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="flex flex-col flex-wrap gap-4 md:px-4">
                <h2 className="top5 text-2xl flex items-center gap-3">Recent Movies</h2>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {recentMovies.map((movie, _id) => (
                        <NavLink
                            key={_id}
                            to={`/movies/${movie._id}`}
                            className="shadow duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${movie.posterUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '300px',
                                    width: '195px',
                                    position: 'relative',
                                    color: 'white',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="absolute bottom-0 px-2">
                                    <span className="text-xs font-medium text-yellow-500 flex gap-1 items-center">
                                        <FaStar className="text-yellow-500" />
                                        {movie.rating}
                                    </span>
                                    <p>{movie.title}</p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default RecentMovies;
