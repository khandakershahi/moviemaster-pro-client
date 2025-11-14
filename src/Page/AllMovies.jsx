import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router";

const AllMovies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosAllMovie = useAxios();

    useEffect(() => {
        setLoading(true);
        axiosAllMovie
            .get("/movies")
            .then((res) => {
                setAllMovies(res.data);
            })
            .catch((err) => console.error("Error fetching movies:", err))
            .finally(() => setLoading(false));
    }, [axiosAllMovie]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="flex flex-col gap-4 md:px-4">
                <h2 className="top5 text-2xl flex items-center gap-3">All Movies</h2>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {allMovies.map((movie, id) => (
                        <NavLink
                            to={`/movies/${movie._id}`}
                            key={id}
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

export default AllMovies;
