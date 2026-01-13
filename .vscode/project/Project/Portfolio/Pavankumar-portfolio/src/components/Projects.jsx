import React from 'react';

const projects = [
    {
        id: 1,
        title: 'Expense Tracker',
        description: 'A comprehensive tool to track personal finances, manage expenses, and visualize spending habits.',
        tags: ['React', 'CSS', 'State Management'],
        link: '#' // Placeholder link
    },
    {
        id: 2,
        title: 'Movie Finder',
        description: 'Discover movies, view ratings, and find detailed information using this interactive movie database application.',
        tags: ['React', 'API Integration', 'UI/UX'],
        link: '#'
    },
    {
        id: 3,
        title: 'Quiz App',
        description: 'An engaging quiz application with timer functionality, score tracking, and instant feedback.',
        tags: ['React', 'Logic', 'Interactive'],
        link: '#'
    },
    {
        id: 4,
        title: 'To-Do Manager',
        description: 'A productivity app to organize tasks, set priorities, and track progress efficiently.',
        tags: ['React', 'CRUD', 'Local Storage'],
        link: '#'
    },
    {
        id: 5,
        title: 'Weather Dashboard',
        description: 'Real-time weather application providing forecasts, current conditions, and location-based data.',
        tags: ['React', 'Weather API', 'Asynchronous JS'],
        link: '#'
    },
    {
        id: 6,
        title: 'Student Enrollment System',
        description: 'A robust system for managing student enrollments, stored in the Reactjs Repository.',
        tags: ['React', 'Forms', 'Data Handling'],
        link: '#'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">My Projects</h2>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image">
                                <span>{project.title.charAt(0)}</span>
                            </div>
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <p>{project.description}</p>
                                <a href={project.link} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>View Project</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
