import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Best Man Speech AI.',
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-card border border-border/60 rounded-2xl overflow-hidden">
        <div className="px-4 py-8 sm:p-10">
          <h1 className="font-display text-3xl font-medium text-foreground mb-8">Privacy Policy for Best Man Speech AI</h1>

          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">1. Introduction</h2>
              <p>Thank you for using Best Man Speech AI. Protecting your privacy is essential to us. This Privacy Policy outlines how Best Man Speech AI (&quot;we&quot;, &quot;us&quot;) collects, uses, and protects your personal information.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">2. Information We Collect</h2>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><strong className="text-foreground">Usage Information:</strong> We collect information about the speeches you generate and how you interact with our platform.</li>
                <li><strong className="text-foreground">Analytics Data:</strong> We collect anonymous analytics data to improve our service.</li>
                <li><strong className="text-foreground">Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to enhance user experience and to analyze traffic patterns.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>To provide, maintain, and improve the Service.</li>
                <li>To analyze usage patterns and trends to improve user experience.</li>
                <li>To send you updates, security alerts, and support messages.</li>
                <li>To communicate with you about our services, offers, and events.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">4. Data Storage and Analysis</h2>
              <p>We do not store the content of your speeches or personal information you input to generate speeches. We store and analyze anonymous usage data related to the Service to improve our offerings. The analysis is strictly for service enhancement and will not be used for any independent purposes.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">5. Sharing of Information</h2>
              <p>We do not sell or lease your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">6. Security</h2>
              <p>We employ a variety of security measures designed to protect your information and keep it confidential. However, no system can be 100% secure, and there&apos;s a risk that data transmission over the internet may be intercepted or accessed by unauthorized parties.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">7. Your Rights</h2>
              <p>Depending on where you reside, you may have the right to access, correct, or delete the personal information we hold about you. As we do not store personal information or speech content, most of these rights are automatically upheld.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">8. Changes to This Policy</h2>
              <p>We may revise this Privacy Policy from time to time, and we will post the most current version on our website. If a revision meaningfully impacts your rights, we will notify you.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-medium text-foreground mb-2">9. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy or our practices, please contact us at <a href="mailto:help@bestmanspeechai.com" className="text-primary hover:text-primary/80">help@bestmanspeechai.com</a>.</p>
            </section>

            <p className="italic">Last updated: September 1, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
