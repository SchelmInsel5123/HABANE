import React from 'react';
import './ImpressumPage.css';

function ImpressumPage() {
  return (
    <div className="impressum-page">
      <div className="impressum-container">
        <h1>Impressum</h1>

        <section className="impressum-section">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            Abhishek Arora<br />
            Bruchweg 52<br />
            32657 Lemgo<br />
            Deutschland
          </p>
        </section>

        <section className="impressum-section">
          <h2>Kontakt</h2>
          <p>
            <strong>Telefon:</strong> <a href="tel:+491623919824">+49 162 3919824</a><br />
            <strong>E-Mail:</strong> <a href="mailto:abhishekarora.de@gmail.com">abhishekarora.de@gmail.com</a>
          </p>
        </section>

        <section className="impressum-section">
          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            Wird derzeit beantragt.
          </p>
        </section>

        <section className="impressum-section">
          <h2>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
          <p>
            Abhishek Arora<br />
            Bruchweg 52<br />
            32657 Lemgo<br />
            Deutschland
          </p>
        </section>

        <section className="impressum-section">
          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <section className="impressum-section">
          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ImpressumPage;
