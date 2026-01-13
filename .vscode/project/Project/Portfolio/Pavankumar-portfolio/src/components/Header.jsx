import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="container nav-content">
                <div className="logo">
                   S.Pavan<span>kumar</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
