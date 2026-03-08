import { useEffect } from 'react';
import Footer from '../components/Footer';
import './TermsPage.css';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="terms-page">
        <div className="terms-container">
          <h1>Terms of Service</h1>
          <p className="terms-updated">Last updated: March 2026</p>

          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using this website (habane.de), you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            <p>
              If you do not agree with these terms, you must not use this website.
            </p>
            <p>This website is operated by:</p>
            <p>
              Abhishek Arora<br />
              Bruchweg 52<br />
              32657 Lemgo<br />
              Germany<br />
              <strong>Email:</strong> <a href="mailto:abhishekarora.de@gmail.com">abhishekarora.de@gmail.com</a>
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Purpose of the Website</h2>
            <p>
              The website provides information about the HABÄNE product and related updates.
            </p>
            <p>The website may include:</p>
            <ul>
              <li>product descriptions</li>
              <li>concept visuals</li>
              <li>newsletters or waitlists</li>
              <li>investor contact options</li>
            </ul>
            <p>
              All information provided is for informational purposes only.
            </p>
          </div>

          <div className="terms-section">
            <h2>3. Age Requirement</h2>
            <p>
              This website is intended for individuals 18 years of age or older.
              By using this website, you confirm that you meet this requirement.
            </p>
          </div>

          <div className="terms-section">
            <h2>4. Product Information and Visualizations</h2>
            <p>
              Product descriptions, specifications, and images on this website are provided for informational purposes.
            </p>
            <p>
              Some product images or visual materials may include conceptual renderings or AI-generated imagery and may differ from the final product.
            </p>
            <p>
              We reserve the right to modify product features, specifications, or designs at any time.
            </p>
          </div>

          <div className="terms-section">
            <h2>5. Intellectual Property</h2>
            <p>All content on this website, including but not limited to:</p>
            <ul>
              <li>text</li>
              <li>images</li>
              <li>graphics</li>
              <li>logos</li>
              <li>product designs</li>
              <li>software</li>
              <li>branding</li>
            </ul>
            <p>
              is the property of HABÄNE or its owner unless otherwise stated.
            </p>
            <p>
              The name HABÄNE and associated branding may be protected by trademark rights.
            </p>
            <p>
              No content from this website may be copied, reproduced, distributed, or used without prior written permission.
            </p>
          </div>

          <div className="terms-section">
            <h2>6. Acceptable Use</h2>
            <p>Users agree not to:</p>
            <ul>
              <li>misuse the website</li>
              <li>attempt unauthorized access to the website or servers</li>
              <li>interfere with website functionality</li>
              <li>scrape or automatically collect data from the website</li>
            </ul>
            <p>
              Violation of these terms may result in restricted access.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. External Links</h2>
            <p>
              This website may contain links to third-party websites.
            </p>
            <p>
              We have no control over the content or privacy practices of these websites and assume no responsibility for them.
            </p>
          </div>

          <div className="terms-section">
            <h2>8. Limitation of Liability</h2>
            <p>
              The content of this website is provided "as is" and for informational purposes only.
            </p>
            <p>We make no guarantees regarding:</p>
            <ul>
              <li>accuracy</li>
              <li>completeness</li>
              <li>availability of the website</li>
              <li>suitability of the information provided</li>
            </ul>
            <p>
              To the maximum extent permitted by law, we are not liable for any damages resulting from the use of this website.
            </p>
          </div>

          <div className="terms-section">
            <h2>9. Investor Disclaimer</h2>
            <p>
              Information provided on this website does not constitute an offer to sell or a solicitation of an offer to buy securities or investments.
            </p>
            <p>
              Any investment discussions or opportunities will be handled separately and in accordance with applicable laws.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms of Service at any time.
            </p>
            <p>
              The current version will always be published on this website.
            </p>
          </div>

          <div className="terms-section">
            <h2>11. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of Germany, without regard to conflict-of-law provisions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
