import React from "react";

const TermsPage = () => {
  return (
    <section className="py-16 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-primary mb-8 text-center">
          Terms & Conditions
        </h1>

        {/* Introduction */}
        <p className="text-lg text-base-content/80 mb-6">
          Welcome to Movie Master Pro. By using our website and services, you
          agree to comply with these Terms & Conditions. Please read them
          carefully.
        </p>

        {/* Use of Service */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            1. Use of Service
          </h2>
          <p className="text-base-content/80">
            You agree to use Movie Master Pro only for lawful purposes and in a
            way that does not infringe the rights of others or restrict their
            use of the service.
          </p>
        </div>

        {/* Account Responsibilities */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            2. Account Responsibilities
          </h2>
          <p className="text-base-content/80">
            Users are responsible for maintaining the confidentiality of their
            account credentials and for all activities that occur under their
            account.
          </p>
        </div>

        {/* Content Submission */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            3. Content Submission
          </h2>
          <p className="text-base-content/80">
            Any reviews, ratings, or content submitted must be truthful and
            respectful. Movie Master Pro reserves the right to remove content
            that violates these terms.
          </p>
        </div>

        {/* Intellectual Property */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            4. Intellectual Property
          </h2>
          <p className="text-base-content/80">
            All content, graphics, and code on Movie Master Pro are the property
            of the site or its licensors. You may not copy, reproduce, or
            distribute any materials without permission.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-base-content/80">
            Movie Master Pro is provided “as is” and we are not liable for any
            damages or losses arising from the use of our services.
          </p>
        </div>

        {/* Changes */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            6. Changes to Terms
          </h2>
          <p className="text-base-content/80">
            We may update these Terms & Conditions at any time. Changes will be
            posted on this page, and your continued use of the service
            constitutes acceptance.
          </p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            7. Contact Us
          </h2>
          <p className="text-base-content/80">
            If you have questions about these Terms & Conditions, please contact
            us at{" "}
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

export default TermsPage;
