import { useEffect } from 'react';
import './NewsletterPage.css';

export default function NewsletterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.defer = true;
    document.body.appendChild(script);

    window.REQUIRED_CODE_ERROR_MESSAGE = 'Wähle bitte einen Ländervorwahl aus.';
    window.LOCALE = 'de';
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
    window.REQUIRED_ERROR_MESSAGE = "Dieses Feld darf nicht leer sein. ";
    window.GENERIC_INVALID_MESSAGE = "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
    window.translation = {
      common: {
        selectedList: '{quantity} Liste ausgewählt',
        selectedLists: '{quantity} Listen ausgewählt',
        selectedOption: '{quantity} ausgewählt',
        selectedOptions: '{quantity} ausgewählt',
      }
    };
    window.AUTOHIDE = Boolean(0);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="newsletter-page">
      <div className="grid-bg"></div>

      <div className="newsletter-page__container">
        <div className="newsletter-page__header">
          <span className="label">Newsletter</span>
          <h1 className="headline-xl">
            Bleib auf dem <span className="gold-text">Laufenden</span>
          </h1>
          <p className="body-lg newsletter-page__subtitle">
            Erfahre als Erster von unserem Launch und erhalte exklusive Updates zu HABÄNE.
          </p>
        </div>

        <div className="sib-form" style={{ textAlign: 'center' }}>
          <div id="sib-form-container" className="sib-form-container">
            <div id="error-message" className="sib-form-message-panel sib-form-message-panel--error">
              <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                  <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                </svg>
                <span className="sib-form-message-panel__inner-text">
                  Deine Anmeldung konnte nicht gespeichert werden. Bitte versuche es erneut.
                </span>
              </div>
            </div>

            <div id="success-message" className="sib-form-message-panel sib-form-message-panel--success">
              <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                </svg>
                <span className="sib-form-message-panel__inner-text">
                  Deine Anmeldung war erfolgreich.
                </span>
              </div>
            </div>

            <div id="sib-container" className="sib-container--large sib-container--vertical newsletter-page__form-wrapper">
              <form
                id="sib-form"
                method="POST"
                action="https://2715062a.sibforms.com/serve/MUIFAOyQyujC5s2R6p-_86KQN10TszN-ePY1AmOmZGsHc0HfFDLjlrZ9aMA_pBuqebGjCj13hmZ_lc5jP8tUCM3KjUjQVb1_NrFkac6FukKouqjOwDONCh0SH6C46X2vC8fC4oBgMXf_SEIzpYyCmrQ2q02l5IZPucdtV7kzj029XJgGdlRwfUYs9HgBF_IcoY102bll7WJS9PrfTw=="
                data-type="subscription"
              >
                <div style={{ padding: '8px 0' }}>
                  <div className="sib-form-block newsletter-page__form-title">
                    <p>HABÄNE-LETTER</p>
                  </div>
                </div>

                <div style={{ padding: '8px 0' }}>
                  <div className="sib-form-block newsletter-page__form-description">
                    <div className="sib-text-form-block">
                      <p>Melde dich zu unserem Newsletter an, um auf dem Laufenden zu bleiben.</p>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '8px 0' }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label newsletter-page__label" htmlFor="EMAIL" data-required="*">
                          Gib deine E-Mail-Adresse ein, um dich anzumelden
                        </label>
                        <div className="entry__field">
                          <input
                            className="input newsletter-page__input"
                            type="text"
                            id="EMAIL"
                            name="EMAIL"
                            autoComplete="off"
                            placeholder="EMAIL"
                            data-required="true"
                            required
                          />
                        </div>
                      </div>
                      <label className="entry__error entry__error--primary newsletter-page__error"></label>
                      <label className="entry__specification newsletter-page__specification">
                        Gib bitte deine E-Mail-Adresse für die Anmeldung an, z. B. abc@xyz.com.
                      </label>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '8px 0' }}>
                  <div className="sib-form-block" style={{ textAlign: 'left' }}>
                    <button
                      className="sib-form-block__button sib-form-block__button-with-loader newsletter-page__submit-btn"
                      form="sib-form"
                      type="submit"
                    >
                      <svg className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                        <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                      </svg>
                      ANMELDEN
                    </button>
                  </div>
                </div>

                <input type="text" name="email_address_check" value="" className="input--hidden" />
                <input type="hidden" name="locale" value="de" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
