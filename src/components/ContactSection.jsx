import { useState } from 'react';
import './ContactSection.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer re_SmGC6cwg_NzG5ohwnwA6aKf2i6LV7eVxc'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'j.tigranjan@arc-nova.io',
          subject: `Contact Form: ${formData.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
          `
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      const mailtoLink = `mailto:j.tigranjan@arc-nova.io?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      setStatus('redirected');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact__content">
          <div className="contact__info">
            <span className="label">Get In Touch</span>
            <h2 className="headline-lg">Contact Us</h2>
            <p className="body-lg contact__description">
              Have questions about HABÄNE? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <svg className="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:j.tigranjan@arc-nova.io">j.tigranjan@arc-nova.io</a>
                </div>
              </div>

              <div className="contact__detail">
                <svg className="contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <h4>Location</h4>
                  <p>Engineered in Germany</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="contact-name" className="contact__label">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="contact__input"
                placeholder="Your name"
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="contact-email" className="contact__label">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="contact__input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="contact-subject" className="contact__label">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="contact__input"
                placeholder="How can we help?"
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="contact-message" className="contact__label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="contact__textarea"
                placeholder="Tell us more about your inquiry..."
                rows="5"
                required
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="contact__message contact__message--success">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {status === 'redirected' && (
              <div className="contact__message contact__message--info">
                Opening your email client...
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
