import React from "react";

const PrivacyPage = () => {
  return (
    <section className="py-16 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-primary mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <p className="text-lg text-gray-700 mb-6">
          At Movie Master Pro, your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you use our website and services.
        </p>

        {/* Information Collection */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Account information such as email, name, and profile image.</li>
            <li>Movie preferences, watchlist, and reviews you submit.</li>
            <li>
              Device and usage information to improve the website experience.
            </li>
          </ul>
        </div>

        {/* How We Use Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>To provide and improve our services.</li>
            <li>To personalize your movie recommendations.</li>
            <li>To communicate with you about your account or updates.</li>
          </ul>
        </div>

        {/* Sharing Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            3. Sharing of Information
          </h2>
          <p className="text-gray-700">
            We do not sell your personal information. Your data may be shared
            with trusted service providers, such as Firebase, to help us operate
            the app.
          </p>
        </div>

        {/* Security */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">4. Security</h2>
          <p className="text-gray-700">
            We take appropriate measures to protect your information from
            unauthorized access or disclosure. However, no method is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </div>

        {/* Changes */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            5. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with the updated date.
          </p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            6. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, please contact us
            at{" "}
            <a
              href="mailto:support@moviemasterpro.com"
              className="text-primary underline"
            >
              support@moviemasterpro.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
