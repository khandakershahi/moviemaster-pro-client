import React, { useState } from 'react';

const Faq = () => {
    const faqs = [
        {
            question: 'How can I discover new movies?',
            answer:
                'Use our Discover Movies feature to explore the latest releases and hidden gems. Personalized recommendations help you find content tailored to your taste.',
        },
        {
            question: 'How do I manage my watchlist?',
            answer:
                'Easily add movies and TV shows to your Watchlist and track them in one place. You can mark favorites, remove items, or mark as watched.',
        },
        {
            question: 'Can I find streaming platforms for a movie?',
            answer:
                'Yes! The Streaming Guide feature shows you instantly where your desired content is available across all major streaming services.',
        },
        {
            question: 'Can I watch trailers and previews?',
            answer:
                'Absolutely! Our Trailers & Previews section keeps you updated with the latest movie trailers and exclusive previews for upcoming releases.',
        },
        {
            question: 'How does the rating system work?',
            answer:
                'You can rate and review movies to refine your personalized recommendations. Your ratings also help the community discover popular content.',
        },
        {
            question: 'Do I get access to live TV?',
            answer:
                'Yes! MovieMaster Pro provides over 200 live TV channels alongside your movie collection, all accessible from one platform.',
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id='faq' className="py-16 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-extrabold text-primary mb-12 text-center">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-secondary rounded-xl overflow-hidden bg-base-200"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-base-content hover:bg-base-300 transition"
                            >
                                {faq.question}
                                <span className="text-primary">{openIndex === index ? '-' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 text-gray-700 border-t border-secondary">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
