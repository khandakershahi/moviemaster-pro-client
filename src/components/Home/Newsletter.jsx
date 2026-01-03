import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Please enter a valid email.');
            return;
        }
        // Here you can call your API or Firebase function to save the email
        setMessage('Thank you for subscribing!');
        setEmail('');
    };

    return (
        <section className="py-12 bg-base-200 text-center">
            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-base-content/80 mb-6">
                    Stay updated with the latest movies, reviews, and streaming tips directly to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full sm:w-auto flex-1"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Subscribe
                    </button>
                </form>
                {message && <p className="mt-4 text-base-content/70">{message}</p>}
            </div>
        </section>
    );
};

export default Newsletter;
