import React, { useEffect, useState, useRef } from 'react';
import { FaFilm, FaUsers } from 'react-icons/fa';
import 'animate.css';
import useAxios from '../../hooks/useAxios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Statistics = () => {
    const [movieCount, setMovieCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [error, setError] = useState(null);
    const axiosMain = useAxios();
    const axiosSecure = useAxiosSecure();
    const cardRefs = useRef([]);

    // Fetch total movies
    useEffect(() => {
        axiosMain
            .get('/movies')
            .then((res) => setMovieCount(res.data.length))
            .catch((err) => {
                console.error('Failed to load movies:', err);
                setError('Failed to load movie data');
            });
    }, [axiosMain]);

    // Fetch total users
    useEffect(() => {
        axiosSecure
            .get('/users') // Make sure your backend endpoint returns all users
            .then((res) => setUserCount(res.data.length))
            .catch((err) => {
                console.error('Failed to load users:', err);
                setError('Failed to load user data');
            });
    }, [axiosSecure]);

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
            { threshold: 0.3 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    const stats = [
        {
            value: error ? 'N/A' : movieCount,
            label: 'Total Movies',
            icon: <FaFilm className="text-4xl text-primary mb-2" />,
        },
        {
            value: error ? 'N/A' : userCount,
            label: 'Total Users',
            icon: <FaUsers className="text-4xl text-primary mb-2" />,
        },
    ];

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="shadow-xl border border-secondary w-80 sm:w-96 flex flex-col justify-center items-center h-48 rounded-3xl bg-linear-to-b from-base-200 to-base-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {stat.icon}
                        <p className="text-6xl font-black text-primary">{stat.value}</p>
                        <p className="text-xl font-bold text-base-content mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Statistics;
