import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router";

const AllMovies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12;
    const skeletonItems = Array.from({ length: 8 });

    const axiosAllMovie = useAxios();

    useEffect(() => {
        setLoading(true);
        axiosAllMovie
            .get("/movies/query", {
                params: {
                    q: query || undefined,
                    genre: genre || undefined,
                    year: year || undefined,
                    page,
                    limit: pageSize,
                    sortBy: "createdAt",
                    sortOrder: "desc",
                },
            })
            .then((res) => {
                setAllMovies(res.data?.data || []);
                setTotalPages(res.data?.totalPages || 1);
            })
            .catch((err) => console.error("Error fetching movies:", err))
            .finally(() => setLoading(false));
    }, [axiosAllMovie, query, genre, year, page]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setLoading(true);
    };

    const handleClear = () => {
        setQuery("");
        setGenre("");
        setYear("");
        setPage(1);
    };

    const genreOptions = [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Thriller",
    ];
    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="flex flex-col gap-6 md:px-4">
                <h2 className="top5 text-3xl font-bold flex items-center gap-3">All Movies</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <select
                        className="select select-bordered w-full"
                        value={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All Genres</option>
                        {genreOptions.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1900"
                        max="2099"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                            setPage(1);
                        }}
                        className="input input-bordered w-full"
                    />
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <button type="submit" className="btn btn-primary w-full">
                            Apply
                        </button>
                        <button type="button" onClick={handleClear} className="btn btn-ghost w-full">
                            Reset
                        </button>
                    </div>
                </form>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 min-h-[200px]">
                    {loading
                        ? skeletonItems.map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className="shadow w-[195px] h-[300px] bg-base-300 animate-pulse rounded-md"
                            />
                        ))
                        : allMovies.map((movie, idx) => (
                            <NavLink
                                to={`/movies/${movie._id}`}
                                key={movie._id || idx}
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

                {totalPages > 1 && (
                    <div className="join justify-center w-full">
                        <button
                            className="join-item btn"
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, idx) => {
                            const pageNum = idx + 1;
                            const isActive = pageNum === page;
                            return (
                                <button
                                    key={pageNum}
                                    className={`join-item btn ${isActive ? "btn-primary" : ""}`}
                                    onClick={() => setPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            className="join-item btn"
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default AllMovies;
