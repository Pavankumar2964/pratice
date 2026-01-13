import { useState } from 'react'
import './index.css'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container nav-content">
          <h1 className="logo">Portfolio.</h1>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="home" className="hero section">
          <div className="container">
            <div className="hero-content">
              <h2>Frontend Developer</h2>
              <p>Building digital experiences with passion and precision.</p>
              <a href="#projects" className="cta-button">View My Work</a>
            </div>
          </div>
        </section>

        <section id="projects" className="projects section">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {/* Project Cards will go here */}
              <div className="project-card">
                <h3>Weather Dashboard</h3>
                <p>Real-time weather tracking with detailed forecasts.</p>
              </div>
              <div className="project-card">
                <h3>Movie Finder</h3>
                <p>Search and discover movies with extensive data.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
