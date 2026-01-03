import React from 'react';

const About = () => {
    return (
        <section className="py-16 bg-base-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-primary mb-4">
                        About MovieMaster Pro
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        MovieMaster Pro is your ultimate destination for discovering, tracking, and enjoying movies and TV shows. Our platform combines personalized recommendations, watchlists, trailers, ratings, and even live TV in a seamless experience.
                    </p>
                </div>

                {/* Mission */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
                    <p className="text-gray-700 text-lg">
                        Our mission is to make discovering and enjoying movies effortless. We aim to bring the best of entertainment to your fingertips, helping you find content that matches your taste and mood.
                    </p>
                </div>

                {/* Features / Why Choose Us */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-6">Why Choose MovieMaster Pro?</h2>
                    <ul className="space-y-4 list-disc list-inside text-gray-700 text-lg">
                        <li>Discover new and trending movies with personalized recommendations.</li>
                        <li>Keep track of your favorites with a comprehensive watchlist.</li>
                        <li>Access trailers, previews, and streaming information instantly.</li>
                        <li>Rate movies to improve your recommendations and share your opinion.</li>
                        <li>Enjoy over 200 live TV channels along with your movie collection.</li>
                        <li>Seamless, fast, and intuitive interface for the best user experience.</li>
                    </ul>
                </div>

                {/* Team or Closing Statement */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                        We envision a world where every movie lover can discover, watch, and share their favorite content effortlessly. MovieMaster Pro is built with the user in mind, combining cutting-edge technology and a passion for cinema.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
