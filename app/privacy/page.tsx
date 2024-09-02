import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Privacy Policy - Best Man Speech AI</title>
        <meta name="description" content="Privacy Policy for Best Man Speech AI" />
      </Head>
      
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy for Best Man Speech AI</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
              <p>Thank you for using Best Man Speech AI. Protecting your privacy is essential to us. This Privacy Policy outlines how Best Man Speech AI ("we", "us") collects, uses, and protects your personal information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
              <ul className="list-disc list-inside pl-4">
                <li><strong>Usage Information:</strong> We collect information about the speeches you generate and how you interact with our platform.</li>
                <li><strong>Analytics Data:</strong> We collect anonymous analytics data to improve our service.</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to enhance user experience and to analyze traffic patterns.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside pl-4">
                <li>To provide, maintain, and improve the Service.</li>
                <li>To analyze usage patterns and trends to improve user experience.</li>
                <li>To send you updates, security alerts, and support messages.</li>
                <li>To communicate with you about our services, offers, and events.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Data Storage and Analysis</h2>
              <p>We do not store the content of your speeches or personal information you input to generate speeches. We store and analyze anonymous usage data related to the Service to improve our offerings. The analysis is strictly for service enhancement and will not be used for any independent purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Sharing of Information</h2>
              <p>We do not sell or lease your personal information to third parties. We might share anonymous, aggregated data with third-party service providers that support our Service, under strict confidentiality agreements.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Security</h2>
              <p>We employ a variety of security measures designed to protect your information and keep it confidential. However, no system can be 100% secure, and there's a risk that data transmission over the internet may be intercepted or accessed by unauthorized parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Your Rights</h2>
              <p>Depending on where you reside, you may have the right to access, correct, or delete the personal information we hold about you. As we do not store personal information or speech content, most of these rights are automatically upheld.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Changes to This Policy</h2>
              <p>We may revise this Privacy Policy from time to time, and we will post the most current version on our website. If a revision meaningfully impacts your rights, we will notify you.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy or our practices, please contact us at help@bestmanspeechai.com.</p>
            </section>

            <p className="italic">Last updated: September 1, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;