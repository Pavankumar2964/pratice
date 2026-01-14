import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="section contact">
            <div className="container contact-content">
                <h2 className="section-title">Let's Work Together</h2>
                <p>I'm currently available for freelance work or full-time opportunities. If you have a project that needs some creative touch, feel free to contact me!</p>
                <a href="mailto:contact@pavankumar.dev" className="btn btn-primary">Say Hello</a>

                <div className="contact-details">
                    <p>Or connect with me via:</p>
                    <div className="social-links">
                        <a href="tel:+919347157442" className="contact-link">Phone: +91 9347157442</a>
                        <a href="https://github.com/Pavankumar2964" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
                        <a href="https://www.linkedin.com/in/pavan-kumar2907/" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Pavankumar Portfolio. Built with React & CSS.</p>
            </footer>
        </section>
    );
};

export default Contact;
