'use client';

import { useState } from 'react';

const navItems = [
  ['Home', '/#home'],
  ['About', '/#about'],
  ['Services', '/#services'],
  ['Work', '/#portfolio'],
  ['Projects', '/projects'],
  ['Contact', '/#contact'],
];

const projects = [
  {
    title: 'Casecraft Test Case Generator',
    description: 'A responsive React application that turns module, sub-module, issue details, preconditions, and test steps into structured QA test cases.',
    image: '/assets/work1.webp',
    tools: ['React', 'Vite', 'Groq', 'Vercel'],
    highlights: ['Structured QA test cases', 'AI-enhanced real-world scenarios', 'Rules-based fallback mode'],
    url: 'https://testcase-generator-six.vercel.app',
  },
];

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <section className="projectsHero">
        <header className="navWrap">
          <a className="brand" href="/#home" aria-label="Rhobert Isaac Calem home">
            <img src="/assets/logo.png" alt="Rhobert Isaac logo" />
          </a>
          <button
            className="menuToggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
          <nav className={menuOpen ? 'navLinks open' : 'navLinks'} aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} className={href === '/projects' ? 'active' : ''} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="container projectsHeroContent">
          <p className="eyebrow">Selected projects</p>
          <h1>Projects I&apos;ve <span>built.</span></h1>
          <p className="heroLead">A growing collection of web apps, QA tools, and experiments I&apos;ve built while learning, solving problems, and exploring new ideas.</p>
          <a className="button secondary" href="/#portfolio">Back to portfolio</a>
        </div>
      </section>

      <section className="section projectsSection">
        <div className="container projectsGrid">
          {projects.map((project) => (
            <article className="projectCard tiltCard" key={project.title}>
              <img src={project.image} alt={`${project.title} preview`} />
              <div className="projectContent">
                <p className="sectionKicker">Featured project</p>
                <h2>{project.title}</h2>
                <p className="sectionText">{project.description}</p>
                <ul className="projectHighlights">
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="projectPills">
                  {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <a className="button primary" href={project.url} target="_blank" rel="noreferrer">Open project ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Rhobert Isaac Calem. Quality Assurance Portfolio.</p>
      </footer>
    </main>
  );
}
