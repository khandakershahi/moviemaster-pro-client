import React, { useEffect, useRef } from 'react';
import { FaLaugh, FaRocket, FaMask, FaPaintBrush, FaTheaterMasks } from 'react-icons/fa';
import { FaExplosion } from 'react-icons/fa6';
import 'animate.css'; // Import animate.css

const Genre = () => {
    const genres = [
        { name: 'Action', icon: <FaExplosion className="text-4xl text-primary mb-2" /> },
        { name: 'Comedy', icon: <FaLaugh className="text-4xl text-primary mb-2" /> },
        { name: 'Sci-Fi', icon: <FaRocket className="text-4xl text-primary mb-2" /> },
        { name: 'Thriller', icon: <FaMask className="text-4xl text-primary mb-2" /> },
        { name: 'Animation', icon: <FaPaintBrush className="text-4xl text-primary mb-2" /> },
        { name: 'Drama', icon: <FaTheaterMasks className="text-4xl text-primary mb-2" /> },
    ];

    // Ref to store card DOM elements
    const cardRefs = useRef([]);

    useEffect(() => {
        // Create IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add animation classes when in view
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        // Apply staggered delay
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                        // Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of the card is visible
                rootMargin: '0px',
            }
        );

        // Observe each card
        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        // Cleanup observer on unmount
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8">
                {genres.map((genre, index) => (
                    <div
                        key={genre.name}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="shadow-xl border border-secondary w-80 sm:w-96 flex flex-col justify-center items-center h-48 rounded-3xl bg-linear-to-b from-base-200 to-base-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {genre.icon}
                        <p className="text-4xl font-black text-primary">{genre.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Genre;