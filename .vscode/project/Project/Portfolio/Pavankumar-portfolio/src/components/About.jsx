import React from 'react';
import profileImage from '../assets/profile.png';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container about-content">
                <div className="about-image">
                    <img src={profileImage} alt="Pavankumar" />
                </div>
                <div className="about-text">
                    <h2 className="section-title">About Me</h2>
                    <p>
                        I am a passionate Frontend Developer with a keen eye for design and a drive for creating seamless digital experiences. With a strong foundation in React.js and modern CSS, I transform ideas into reality.
                    </p>
                    <p>
                        My journey involves working on diverse projects ranging from weather dashboards to movie finders, constantly pushing the boundaries of what's possible on the web.
                    </p>
                    <a href="#contact" className="btn btn-outline">Get In Touch</a>
                </div>
            </div>
        </section>
    );
};

export default About;
