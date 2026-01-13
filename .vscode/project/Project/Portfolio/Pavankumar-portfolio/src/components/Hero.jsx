import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="container hero-content">
                <h1 className="hero-title">
                    Hi, I'm Pavankumar
                    <span>Frontend Developer</span>
                </h1>
                <p className="hero-subtitle">
                    Crafting beautiful, responsive, and user-friendly web experiences using modern technologies like React and cutting-edge CSS.
                </p>
                <div className="hero-cta">
                    <a href="#projects" className="btn btn-primary">View My Work</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
