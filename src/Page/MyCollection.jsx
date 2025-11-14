import React, { useEffect, useState } from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyCollection = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [myMovies, setMyMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);

        axiosSecure
            .get("/movies/my-collection")
            .then((res) => setMyMovies(res.data))
            .catch((err) => console.error("Error fetching user movies:", err))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This movie will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/movies/${id}`);
                    setMyMovies((prev) => prev.filter((m) => m._id !== id));
                    Swal.fire("Deleted!", "Your movie has been removed.", "success");
                } catch (err) {
                    Swal.fire("Error!", "Failed to delete movie.", "error");
                }
            }
        });
    };

    const handleEdit = (id) => {
        window.location.href = `/movies/update/${id}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">🎞 My Collections</h2>

                {myMovies.length === 0 ? (
                    <p className="text-gray-400 text-center mt-6">
                        You haven’t added any movies yet.
                    </p>
                ) : (
                    <div className="flex flex-row justify-between flex-wrap gap-5">
                        {myMovies.map((movie) => (
                            <div
                                key={movie._id}
                                className="relative shadow duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden rounded-md"
                                style={{
                                    backgroundImage: `url(${movie.posterUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    height: "300px",
                                    width: "200px",
                                    position: "relative",
                                    color: "white",
                                }}
                            >
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/40"></div>

                                {/* Buttons */}
                                <div className="absolute top-2 right-2 flex gap-2 z-10">
                                    <button
                                        onClick={() => handleEdit(movie._id)}
                                        className="btn btn-xs btn-primary"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(movie._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                                {/* Movie info */}
                                <div className="absolute bottom-0 px-2 pb-2 z-10">
                                    <span className="text-xs font-medium text-yellow-500 flex gap-1 items-center">
                                        <FaStar className="text-yellow-500" />
                                        {movie.rating}
                                    </span>
                                    <p className="text-sm font-semibold">{movie.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCollection;
