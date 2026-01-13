import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="section contact">
            <div className="container contact-content">
                <h2 className="section-title">Let's Work Together</h2>
                <p>I'm currently available for freelance work or full-time opportunities. If you have a project that needs some creative touch, feel free to contact me!</p>
                <a href="mailto:contact@pavankumar.dev" className="btn btn-primary">Say Hello</a>
            </div>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Pavankumar Portfolio. Built with React & CSS.</p>
            </footer>
        </section>
    );
};

export default Contact;
