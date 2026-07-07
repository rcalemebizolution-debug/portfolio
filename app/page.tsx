'use client';

import { FormEvent, useState } from 'react';

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Work', '#portfolio'],
  ['Contact', '#contact'],
];

const stats = [
  ['2+', 'Years QA experience'],
  ['3', 'Testing specialties'],
  ['100%', 'Quality-focused delivery'],
];

const skills = [
  'Automation test script development',
  'Manual test case execution',
  'Performance and load testing fundamentals',
  'HTML, CSS, JavaScript, PHP, and React/Next.js basics',
  'Bug reporting, regression testing, and SDLC collaboration',
];

const experience = [
  ['March 2023 - May 2023', 'Mid Level Software Quality Analyst'],
  ['October 2021 - March 2023', 'Automation Specialist'],
  ['August 2021 - October 2021', 'Performance Tester Specialist'],
];

const education = [['2016 - 2020', 'Bachelor of Science in Information Technology']];

const services = [
  {
    icon: '✓',
    title: 'Manual Testing',
    description:
      'Structured test planning, exploratory testing, regression coverage, clear defect reports, and user-focused validation.',
  },
  {
    icon: '⚙',
    title: 'Automation Testing',
    description:
      'Reusable automation scripts that simplify complex test flows, reduce repetitive checks, and speed up releases.',
  },
  {
    icon: '↯',
    title: 'Performance Testing',
    description:
      'Response-time and stability checks that help teams understand how applications behave under realistic conditions.',
  },
];

const works = [
  {
    image: '/assets/work1.webp',
    title: 'Automation Testing',
    description: 'Turning complex quality checks into repeatable automation flows for faster confidence.',
  },
  {
    image: '/assets/work 2.jpg',
    title: 'Manual Testing',
    description: 'Finding usability issues, functional defects, edge cases, and regression risks before release.',
  },
  {
    image: '/assets/work 3.jpg',
    title: 'Performance Testing',
    description: 'Evaluating application behavior under load, stress, and real-world usage patterns.',
  },
];

const tabs = {
  skills,
  experience,
  education,
};

type TabKey = keyof typeof tabs;

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('skills');
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbySmvQiBZaCMv-Dqwz2sHQCBAamNluaAMV02KoAXcvFZYUe0QERD7gt60LFg85L31Sa/exec';

    try {
      await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      setMessage('Message sent successfully. Thank you!');
      form.reset();
    } catch {
      setMessage('Unable to send right now. Please email me directly.');
    }

    window.setTimeout(() => setMessage(''), 5000);
  }

  return (
    <main>
      <section id="home" className="hero">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />
        <header className="navWrap">
          <a className="brand" href="#home" aria-label="Rhobert Isaac Calem home">
            <img src="/assets/logo.png" alt="Rhobert Isaac logo" />
          </a>
          <button
            className="menuToggle"
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
          <nav className={menuOpen ? 'navLinks open' : 'navLinks'} aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="container heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Quality Assurance Analyst • Automation Specialist</p>
            <h1>
              Hi, I&apos;m <span>Rhobert Isaac</span>, building confidence in every software release.
            </h1>
            <p className="heroLead">
              I help teams ship cleaner software through automation, manual validation, and performance testing—backed by a growing foundation in modern web development.
            </p>
            <div className="heroActions">
              <a className="button primary" href="#portfolio">
                View work
              </a>
              <a className="button secondary" href="#contact">
                Contact me
              </a>
            </div>
            <div className="stats" aria-label="Portfolio highlights">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="heroCard" aria-label="Profile image">
            <img src="/assets/My project.png" alt="Rhobert Isaac Calem" />
          </div>
        </div>
      </section>

      <section id="about" className="section aboutSection">
        <div className="container aboutGrid">
          <div className="portraitFrame">
            <img src="/assets/1.jpg" alt="Rhobert Isaac portrait" />
          </div>
          <div>
            <p className="sectionKicker">About me</p>
            <h2>QA professional with a developer mindset.</h2>
            <p className="sectionText">
              I&apos;m a Quality Assurance Analyst from the Philippines with around two years of experience in automation development, plus hands-on exposure to manual and performance testing. I enjoy translating product risks into practical test coverage and collaborating with teams to make releases smoother.
            </p>
            <p className="sectionText">
              Beyond QA, I continue to build web development skills with HTML, CSS, JavaScript, PHP, React, and Next.js—giving me a stronger understanding of how applications are designed, built, tested, and improved.
            </p>

            <div className="tabs" role="tablist" aria-label="About details">
              {(Object.keys(tabs) as TabKey[]).map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tabPanel" role="tabpanel">
              {activeTab === 'skills' && (
                <ul className="pillList">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'experience' && (
                <ul className="timeline">
                  {experience.map(([date, role]) => (
                    <li key={role}>
                      <span>{date}</span>
                      <strong>{role}</strong>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'education' && (
                <ul className="timeline">
                  {education.map(([date, degree]) => (
                    <li key={degree}>
                      <span>{date}</span>
                      <strong>{degree}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section altSection">
        <div className="container">
          <p className="sectionKicker">Services</p>
          <h2>Testing support for reliable products.</h2>
          <div className="cardGrid">
            {services.map((service) => (
              <article className="serviceCard" key={service.title}>
                <span>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section">
        <div className="container">
          <div className="sectionHeader">
            <div>
              <p className="sectionKicker">Portfolio</p>
              <h2>Featured QA work areas.</h2>
            </div>
            <a className="textLink" href="#contact">
              Let&apos;s work together →
            </a>
          </div>
          <div className="workGrid">
            {works.map((work) => (
              <article className="workCard" key={work.title}>
                <img src={work.image} alt={`${work.title} project preview`} />
                <div>
                  <h3>{work.title}</h3>
                  <p>{work.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contactSection">
        <div className="container contactGrid">
          <div>
            <p className="sectionKicker">Contact</p>
            <h2>Have a QA or web project in mind?</h2>
            <p className="sectionText">
              Send a message and I&apos;ll get back to you. I&apos;m available for QA testing, automation support, and quality-focused collaboration.
            </p>
            <div className="contactList">
              <a href="mailto:isaacsample@gmail.com">✉ isaacsample@gmail.com</a>
              <a href="tel:09156822453">☎ 09156822453</a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href="/CV - (QA Automation) - Rhobert Isaac Calem.docx" download>
                Download CV
              </a>
            </div>
          </div>
          <form className="contactForm" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="Name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="Email" placeholder="you@example.com" required />
            </label>
            <label>
              Message
              <textarea name="Message" rows={6} placeholder="Tell me about your project" />
            </label>
            <button className="button primary" type="submit">
              Submit message
            </button>
            {message && <p className="formMessage">{message}</p>}
          </form>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Rhobert Isaac Calem. Quality Assurance Portfolio.</p>
      </footer>
    </main>
  );
}
