import React, { useEffect, useRef } from 'react';
import { FaFilm, FaStar, FaTv, FaPlayCircle, FaList, FaSearch } from 'react-icons/fa';
import 'animate.css'; // Import animate.css

const MovieMasterPro = () => {
    const features = [
        {
            icon: <FaSearch className="text-4xl text-primary mb-2" />,
            title: 'Discover Movies',
            description: 'Find the latest releases and hidden gems with personalized recommendations tailored to your taste.',
        },
        {
            icon: <FaList className="text-4xl text-primary mb-2" />,
            title: 'Watchlist',
            description: 'Easily organize and track your favorite movies and TV shows in a single, intuitive place.',
        },
        {
            icon: <FaTv className="text-4xl text-primary mb-2" />,
            title: 'Streaming Guide',
            description: 'Instantly see where to watch your desired content across all major streaming platforms.',
        },
        {
            icon: <FaPlayCircle className="text-4xl text-primary mb-2" />,
            title: 'Trailers & Previews',
            description: 'Stay ahead with the latest trailers and exclusive previews for upcoming movies.',
        },
        {
            icon: <FaStar className="text-4xl text-primary mb-2" />,
            title: 'Personalized Ratings',
            description: 'Rate and review movies to refine your recommendations and share your opinions.',
        },
        {
            icon: <FaFilm className="text-4xl text-primary mb-2" />,
            title: 'Live TV Access',
            description: 'Enjoy over 200 live TV channels alongside your movie collection, all in one platform.',
        },
    ];

    // Ref to store card DOM elements
    const cardRefs = useRef([]);

    useEffect(() => {
        // Create IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        entry.target.style.animationDelay = `${index * 0.1}s`;
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content">
                        Unlock the Power of <span className="text-primary">MovieMaster Pro</span>
                    </h2>
                    <p className="mt-4 text-lg text-base-content/80 max-w-3xl mx-auto">
                        Experience the ultimate movie and TV platform with personalized features, seamless streaming, and exclusive content.
                    </p>
                </div>
                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="shadow-xl border border-secondary rounded-3xl p-6 flex flex-col items-center text-center bg-linear-to-b from-base-200 to-base-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold text-base-content mb-2">{feature.title}</h3>
                            <p className="text-base-content/80 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MovieMasterPro;