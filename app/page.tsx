'use client';

import { FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react';

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
  ['24/7', 'Quality mindset'],
];

const skills = [
  'Automation test script development',
  'Manual and exploratory testing',
  'Performance testing fundamentals',
  'Regression suites and bug reporting',
  'HTML, CSS, JavaScript, PHP, React, and Next.js basics',
];

const experience = [
  ['March 2023 - May 2023', 'Mid Level Software Quality Analyst'],
  ['October 2021 - March 2023', 'Automation Specialist'],
  ['August 2021 - October 2021', 'Performance Tester Specialist'],
];

const education = [['2016 - 2020', 'Bachelor of Science in Information Technology']];

const services = [
  {
    icon: '✦',
    title: 'Manual Testing',
    description:
      'Structured test planning, exploratory sessions, regression coverage, and clear defect reports that help teams release confidently.',
    details: [
      'Functional and UI validation',
      'Test case design and execution',
      'Actionable defect documentation',
    ],
  },
  {
    icon: '⚙',
    title: 'Automation Testing',
    description:
      'Reusable automation flows that simplify repetitive checks, protect key journeys, and speed up every release cycle.',
    details: ['Script creation from scratch', 'Smoke and regression automation', 'Maintainable test coverage'],
  },
  {
    icon: '↯',
    title: 'Performance Testing',
    description:
      'Response-time and stability checks that reveal how web applications behave under realistic traffic and pressure.',
    details: ['Load scenario planning', 'Bottleneck discovery', 'Performance result reporting'],
  },
];

const works = [
  {
    image: '/assets/work1.webp',
    title: 'Automation Testing',
    category: 'Automation',
    description: 'Turning complex quality checks into repeatable flows for faster confidence.',
    metrics: ['Faster regression checks', 'Reusable test scripts', 'Cleaner release gates'],
  },
  {
    image: '/assets/work 2.jpg',
    title: 'Manual Testing',
    category: 'Manual',
    description: 'Finding usability issues, functional defects, edge cases, and regression risks before release.',
    metrics: ['Detailed defects', 'User-focused validation', 'Exploratory coverage'],
  },
  {
    image: '/assets/work 3.jpg',
    title: 'Performance Testing',
    category: 'Performance',
    description: 'Evaluating application behavior under load, stress, and real-world usage patterns.',
    metrics: ['Load insights', 'Response-time checks', 'Stability review'],
  },
];

const processSteps = [
  ['01', 'Understand risk', 'Map the most important user flows, business rules, and release risks.'],
  ['02', 'Design coverage', 'Create focused manual, automation, and performance checks around those risks.'],
  ['03', 'Execute & report', 'Run tests, document evidence, and communicate defects in a practical way.'],
  ['04', 'Improve quality', 'Turn repeated issues into stronger regression coverage and release confidence.'],
];

const tabs = {
  skills,
  experience,
  education,
};

type TabKey = keyof typeof tabs;
type WorkCategory = 'All' | 'Automation' | 'Manual' | 'Performance';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('skills');
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [activeNav, setActiveNav] = useState('#home');
  const [activeService, setActiveService] = useState(0);
  const [selectedWork, setSelectedWork] = useState(0);
  const [workFilter, setWorkFilter] = useState<WorkCategory>('All');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 24 });

  const categories = useMemo<WorkCategory[]>(() => ['All', 'Automation', 'Manual', 'Performance'], []);
  const filteredWorks = useMemo(
    () => works.filter((work) => workFilter === 'All' || work.category === workFilter),
    [workFilter],
  );

  useEffect(() => {
    const sectionIds = navItems.map(([, href]) => href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(`#${visible.target.id}`);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  function handleHeroMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((event.clientY - rect.top) / rect.height) * 100),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbySmvQiBZaCMv-Dqwz2sHQCBAamNluaAMV02KoAXcvFZYUe0QERD7gt60LFg85L31Sa/exec';

    setMessage('Sending your message...');
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
      <section
        id="home"
        className="hero"
        onMouseMove={handleHeroMove}
        style={{ '--spotlight-x': `${spotlight.x}%`, '--spotlight-y': `${spotlight.y}%` } as React.CSSProperties}
      >
        <div className="orbit orbitOne" />
        <div className="orbit orbitTwo" />
        <header className="navWrap">
          <a className="brand" href="#home" aria-label="Rhobert Isaac Calem home">
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
              <a
                key={href}
                className={activeNav === href ? 'active' : ''}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="container heroGrid">
          <div className="heroCopy revealCard">
            <p className="eyebrow">Quality Assurance Analyst • Automation Specialist</p>
            <h1>
              Interactive QA portfolio for <span>software confidence.</span>
            </h1>
            <p className="heroLead">
              Hi, I&apos;m Rhobert Isaac Calem. I help teams ship cleaner software through manual validation, automation testing, performance checks, and a developer-minded approach to quality.
            </p>
            <div className="heroActions">
              <a className="button primary magnetic" href="#portfolio">
                Explore work
              </a>
              <a className="button secondary" href="#contact">
                Start a project
              </a>
            </div>
            <div className="stats" aria-label="Portfolio highlights">
              {stats.map(([value, label]) => (
                <div className="tiltCard" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="heroVisual">
            <div className="heroCard tiltCard" aria-label="Profile image">
              <img src="/assets/My project.png" alt="Rhobert Isaac Calem" />
              <div className="floatingBadge badgeTop">Automation</div>
              <div className="floatingBadge badgeBottom">Manual + Performance</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section aboutSection">
        <div className="container aboutGrid">
          <div className="portraitFrame tiltCard">
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
        <div className="container servicesGrid">
          <div>
            <p className="sectionKicker">Services</p>
            <h2>Click a service to see how I help.</h2>
            <p className="sectionText">Choose a quality track and the panel updates with the exact focus areas I can support.</p>
            <div className="serviceSelector" role="tablist" aria-label="Service details">
              {services.map((service, index) => (
                <button
                  key={service.title}
                  className={activeService === index ? 'servicePill active' : 'servicePill'}
                  type="button"
                  role="tab"
                  aria-selected={activeService === index}
                  onClick={() => setActiveService(index)}
                >
                  <span>{service.icon}</span>
                  {service.title}
                </button>
              ))}
            </div>
          </div>
          <article className="serviceDetail tiltCard">
            <span className="serviceIcon">{services[activeService].icon}</span>
            <h3>{services[activeService].title}</h3>
            <p>{services[activeService].description}</p>
            <ul>
              {services[activeService].details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section processSection" aria-labelledby="process-title">
        <div className="container">
          <p className="sectionKicker">Process</p>
          <h2 id="process-title">A quality workflow with motion and clarity.</h2>
          <div className="processRail">
            {processSteps.map(([number, title, description]) => (
              <article className="processCard" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
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
          <div className="filterBar" aria-label="Filter portfolio work">
            {categories.map((category) => (
              <button
                key={category}
                className={workFilter === category ? 'active' : ''}
                type="button"
                onClick={() => {
                  setWorkFilter(category);
                  setSelectedWork(0);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="workShowcase">
            <div className="workList" role="tablist" aria-label="Portfolio previews">
              {filteredWorks.map((work, index) => (
                <button
                  key={work.title}
                  className={selectedWork === index ? 'active' : ''}
                  type="button"
                  role="tab"
                  aria-selected={selectedWork === index}
                  onClick={() => setSelectedWork(index)}
                >
                  <span>{work.category}</span>
                  {work.title}
                </button>
              ))}
            </div>
            <article className="featuredWork tiltCard">
              <img src={filteredWorks[selectedWork].image} alt={`${filteredWorks[selectedWork].title} project preview`} />
              <div className="featuredOverlay">
                <p>{filteredWorks[selectedWork].category}</p>
                <h3>{filteredWorks[selectedWork].title}</h3>
                <p>{filteredWorks[selectedWork].description}</p>
                <div>
                  {filteredWorks[selectedWork].metrics.map((metric) => (
                    <span key={metric}>{metric}</span>
                  ))}
                </div>
              </div>
            </article>
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
          <form className="contactForm tiltCard" onSubmit={handleSubmit}>
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
