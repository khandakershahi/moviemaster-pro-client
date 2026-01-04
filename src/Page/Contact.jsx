import React from 'react';

const Contact = () => {
    return (
        <section className="py-16 bg-base-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-6">Get in Touch</h2>
                    <p className="text-base-content/70 mb-8">
                        Have questions or want to collaborate? Fill out the form below and we'll get back to you shortly.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-base-content/80">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full border border-base-300 rounded-lg p-3 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-base-content/80">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full border border-base-300 rounded-lg p-3 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Your Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-base-content/80">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                className="mt-1 block w-full border border-base-300 rounded-lg p-3 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="mt-12 space-y-4 text-base-content/80">
                        <p>
                            <strong>Address:</strong> 123 Movie Lane, Film City, CA 90000
                        </p>
                        <p>
                            <strong>Email:</strong> contact@moviemasterpro.com
                        </p>
                        <p>
                            <strong>Phone:</strong> +1 (555) 123-4567
                        </p>
                    </div>
                </div>

                {/* Google Map */}
                <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="MovieMaster Pro Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0199473175615!2d-122.419415484681!3d37.77492977975978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2f7e2f15%3A0x93f6f763bfa1ef!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1704210000000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
