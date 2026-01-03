import React from 'react';
import { Link } from 'react-router';

const CTA = () => {
    return (
        <section className="py-12 bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Explore the World of Movies
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/80">
                    Browse, watch, and discover your favorite movies with Movie Master Pro.
                    Start your cinematic journey now!
                </p>
                <Link
                    to="/movies"
                    className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Browse All Movies
                </Link>
            </div>
        </section>
    );
};

export default CTA;
