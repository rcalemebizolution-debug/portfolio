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
    details: ['Functional and UI validation', 'Test case design and execution', 'Actionable defect documentation'],
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
    goal: 'Build dependable automated checks around critical product journeys so teams can release with less manual repetition.',
    tools: ['Selenium', 'JavaScript', 'GitHub', 'Regression Suites'],
    process: ['Identify stable smoke paths', 'Create reusable test data', 'Automate repeatable validations', 'Report failures with clear evidence'],
    result: 'Shorter feedback loops, stronger release confidence, and cleaner regression coverage.',
  },
  {
    image: '/assets/work 2.jpg',
    title: 'Manual Testing',
    category: 'Manual',
    description: 'Finding usability issues, functional defects, edge cases, and regression risks before release.',
    metrics: ['Detailed defects', 'User-focused validation', 'Exploratory coverage'],
    goal: 'Validate features from a real user perspective and communicate defects in a way developers can act on quickly.',
    tools: ['Jira', 'Test Cases', 'Exploratory Testing', 'Bug Reports'],
    process: ['Review requirements', 'Design positive and negative scenarios', 'Execute cross-flow checks', 'Document actual vs expected results'],
    result: 'Better issue visibility, clearer acceptance coverage, and fewer missed edge cases.',
  },
  {
    image: '/assets/work 3.jpg',
    title: 'Performance Testing',
    category: 'Performance',
    description: 'Evaluating application behavior under load, stress, and real-world usage patterns.',
    metrics: ['Load insights', 'Response-time checks', 'Stability review'],
    goal: 'Understand how an application performs under realistic usage and identify bottlenecks before users feel them.',
    tools: ['JMeter', 'Load Scenarios', 'Response Metrics', 'Reports'],
    process: ['Define load profile', 'Run baseline checks', 'Analyze response trends', 'Recommend performance improvements'],
    result: 'Clearer performance expectations, better stability insight, and practical optimization targets.',
  },
];

const processSteps = [
  ['01', 'Understand risk', 'Map the most important user flows, business rules, and release risks.'],
  ['02', 'Design coverage', 'Create focused manual, automation, and performance checks around those risks.'],
  ['03', 'Execute & report', 'Run tests, document evidence, and communicate defects in a practical way.'],
  ['04', 'Improve quality', 'Turn repeated issues into stronger regression coverage and release confidence.'],
];

const techStack = ['Selenium', 'Postman', 'JMeter', 'Jira', 'GitHub', 'JavaScript', 'React', 'Next.js', 'HTML', 'CSS', 'PHP', 'Regression Testing'];

const testimonials = [
  ['Clear communicator', 'Rhobert explains bugs with useful evidence, making it easier for developers to reproduce and fix issues.'],
  ['Quality focused', 'He thinks beyond the happy path and helps the team catch edge cases before release.'],
  ['Automation mindset', 'He looks for repeatable checks and ways to make regression testing more efficient.'],
];

const resumeTimeline = [
  ['2023', 'Mid Level Software Quality Analyst', 'Owned quality checks, release validation, and defect communication.'],
  ['2021 - 2023', 'Automation Specialist', 'Built test scripts, improved repeatable testing, and supported regression confidence.'],
  ['2021', 'Performance Tester Specialist', 'Supported response-time checks and performance testing activities.'],
  ['2016 - 2020', 'BS Information Technology', 'Built a foundation in software, web, and IT fundamentals.'],
];

const dashboardMetrics = [
  ['Pass Rate', '98%', 'Stable smoke checks'],
  ['Automated Checks', '42', 'Reusable flows'],
  ['Critical Bugs', '03', 'Prioritized defects'],
  ['Avg Response', '1.2s', 'Performance signal'],
];

const commandItems = [
  ['Go to Home', '#home'],
  ['Go to About', '#about'],
  ['Go to Services', '#services'],
  ['Go to Portfolio', '#portfolio'],
  ['Go to Contact', '#contact'],
  ['Download CV', '/CV - (QA Automation) - Rhobert Isaac Calem.docx'],
];

const aiQuickPrompts = [
  'What QA services do you offer?',
  'Summarize your automation experience',
  'How can I contact you?',
  'Which tools do you use?',
];

const aiCapabilities = [
  ['Portfolio guide', 'Answers quick questions about skills, services, projects, resume, and contact details.'],
  ['QA recommender', "Suggests whether manual, automation, or performance testing fits a visitor's project."],
  ['Lead helper', 'Guides recruiters and clients to the best next action without leaving the page.'],
];

const tabs = { skills, experience, education };

type TabKey = keyof typeof tabs;
type WorkCategory = 'All' | 'Automation' | 'Manual' | 'Performance';
type Theme = 'dark' | 'light';
type AiMessage = { role: 'assistant' | 'user'; text: string };

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('skills');
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');
  const [activeService, setActiveService] = useState(0);
  const [selectedWork, setSelectedWork] = useState(0);
  const [workFilter, setWorkFilter] = useState<WorkCategory>('All');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 24 });
  const [modalWorkIndex, setModalWorkIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');
  const [commandOpen, setCommandOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([
    {
      role: 'assistant',
      text: "Hi, I'm Rhobert's portfolio AI guide. Ask me about QA services, automation, performance testing, tools, resume, or contact details.",
    },
  ]);

  const categories = useMemo<WorkCategory[]>(() => ['All', 'Automation', 'Manual', 'Performance'], []);
  const filteredWorks = useMemo(
    () => works.filter((work) => workFilter === 'All' || work.category === workFilter),
    [workFilter],
  );
  const activeWork = filteredWorks[selectedWork] ?? filteredWorks[0] ?? works[0];
  const modalWork = modalWorkIndex === null ? null : works[modalWorkIndex];

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

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.scrollReveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setModalWorkIndex(null);
        setAiOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleHeroMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((event.clientY - rect.top) / rect.height) * 100),
    });
  }

  function jumpTo(target: string) {
    setCommandOpen(false);
    if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = target;
  }

  function getAiResponse(prompt: string) {
    const question = prompt.toLowerCase();
    if (question.includes('contact') || question.includes('email') || question.includes('hire')) {
      return 'You can contact Rhobert through the contact form, email isaacsample@gmail.com, call 09156822453, or download the CV from this page.';
    }
    if (question.includes('service') || question.includes('offer')) {
      return 'Rhobert offers manual testing, automation testing, and performance testing support, plus clear defect reporting and release-quality collaboration.';
    }
    if (question.includes('automation') || question.includes('script') || question.includes('selenium')) {
      return 'Rhobert focuses on reusable automation scripts, smoke checks, and regression flows that reduce repetitive testing and improve release confidence.';
    }
    if (question.includes('performance') || question.includes('load') || question.includes('jmeter')) {
      return 'For performance testing, Rhobert can help define load scenarios, check response trends, identify bottlenecks, and report optimization targets.';
    }
    if (question.includes('manual') || question.includes('bug') || question.includes('defect')) {
      return 'Manual testing support includes requirement review, positive and negative scenarios, exploratory checks, and clear defect reports with evidence.';
    }
    if (question.includes('tool') || question.includes('stack')) {
      return 'The portfolio highlights Selenium, Postman, JMeter, Jira, GitHub, JavaScript, React, Next.js, HTML, CSS, PHP, and regression testing.';
    }
    if (question.includes('resume') || question.includes('experience') || question.includes('cv')) {
      return 'Rhobert has around 2 years of QA experience across automation, manual testing, and performance testing. You can download the full CV from the resume or contact section.';
    }
    return 'Rhobert is a QA professional with a developer mindset. He can support manual testing, automation testing, performance checks, defect reporting, and quality-focused collaboration.';
  }

  function sendAiMessage(prompt?: string) {
    const text = (prompt ?? aiInput).trim();
    if (!text) return;
    setAiMessages((messages) => [
      ...messages,
      { role: 'user', text },
      { role: 'assistant', text: getAiResponse(text) },
    ]);
    setAiInput('');
    setAiOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbySmvQiBZaCMv-Dqwz2sHQCBAamNluaAMV02KoAXcvFZYUe0QERD7gt60LFg85L31Sa/exec';

    setIsSubmitting(true);
    setMessage('Sending your message...');
    try {
      await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      setMessage('✅ Message sent successfully. Thank you!');
      form.reset();
    } catch {
      setMessage('Unable to send right now. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }

    window.setTimeout(() => setMessage(''), 5000);
  }

  return (
    <main data-theme={theme}>
      <button className="themeToggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
      </button>
      <button className="commandTrigger" type="button" onClick={() => setCommandOpen(true)}>
        Ctrl K
      </button>

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
              <a key={href} className={activeNav === href ? 'active' : ''} href={href} onClick={() => setMenuOpen(false)}>
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
              <a className="button primary magnetic" href="#portfolio">Explore work</a>
              <a className="button secondary" href="#contact">Start a project</a>
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

      <section id="about" className="section aboutSection scrollReveal">
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
                <button key={tab} className={activeTab === tab ? 'active' : ''} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)}>
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tabPanel" role="tabpanel">
              {activeTab === 'skills' && <ul className="pillList">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>}
              {activeTab === 'experience' && <ul className="timeline">{experience.map(([date, role]) => <li key={role}><span>{date}</span><strong>{role}</strong></li>)}</ul>}
              {activeTab === 'education' && <ul className="timeline">{education.map(([date, degree]) => <li key={degree}><span>{date}</span><strong>{degree}</strong></li>)}</ul>}
            </div>
          </div>
        </div>
      </section>

      <section className="stackSection scrollReveal" aria-label="Technology stack">
        <div className="stackTrack">
          {[...techStack, ...techStack].map((tool, index) => <span key={`${tool}-${index}`}>{tool}</span>)}
        </div>
      </section>

      <section id="services" className="section altSection scrollReveal">
        <div className="container servicesGrid">
          <div>
            <p className="sectionKicker">Services</p>
            <h2>Click a service to see how I help.</h2>
            <p className="sectionText">Choose a quality track and the panel updates with the exact focus areas I can support.</p>
            <div className="serviceSelector" role="tablist" aria-label="Service details">
              {services.map((service, index) => (
                <button key={service.title} className={activeService === index ? 'servicePill active' : 'servicePill'} type="button" role="tab" aria-selected={activeService === index} onClick={() => setActiveService(index)}>
                  <span>{service.icon}</span>{service.title}
                </button>
              ))}
            </div>
          </div>
          <article className="serviceDetail tiltCard">
            <span className="serviceIcon">{services[activeService].icon}</span>
            <h3>{services[activeService].title}</h3>
            <p>{services[activeService].description}</p>
            <ul>{services[activeService].details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section dashboardSection scrollReveal" aria-labelledby="dashboard-title">
        <div className="container dashboardGrid">
          <div>
            <p className="sectionKicker">QA Dashboard</p>
            <h2 id="dashboard-title">Live-style quality metrics.</h2>
            <p className="sectionText">A visual snapshot of the kind of quality signals I track: pass rate, automation coverage, critical defects, and performance response.</p>
          </div>
          <div className="metricGrid">
            {dashboardMetrics.map(([label, value, note]) => (
              <article className="metricCard tiltCard" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section aiSection scrollReveal" aria-labelledby="ai-title">
        <div className="container aiGrid">
          <div>
            <p className="sectionKicker">AI Assistant</p>
            <h2 id="ai-title">Ask the portfolio before you contact me.</h2>
            <p className="sectionText">I added an AI-style portfolio guide that can answer common visitor questions about my QA services, tools, experience, resume, and contact options directly on the page.</p>
            <div className="aiPromptChips">
              {aiQuickPrompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => sendAiMessage(prompt)}>{prompt}</button>
              ))}
            </div>
          </div>
          <div className="aiPreview tiltCard">
            <div className="aiOrb">AI</div>
            <div className="aiPreviewMessages">
              <p><strong>Visitor:</strong> What testing service fits my app?</p>
              <p><strong>AI Guide:</strong> Start with manual coverage, add automation for repeated flows, then performance checks for launch confidence.</p>
            </div>
            <div className="aiCapabilityGrid">
              {aiCapabilities.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section processSection scrollReveal" aria-labelledby="process-title">
        <div className="container">
          <p className="sectionKicker">Process</p>
          <h2 id="process-title">A quality workflow with motion and clarity.</h2>
          <div className="processRail">
            {processSteps.map(([number, title, description]) => (
              <article className="processCard" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section scrollReveal">
        <div className="container">
          <div className="sectionHeader">
            <div>
              <p className="sectionKicker">Portfolio</p>
              <h2>Featured QA work areas.</h2>
            </div>
            <a className="textLink" href="#contact">Let&apos;s work together →</a>
          </div>
          <div className="filterBar" aria-label="Filter portfolio work">
            {categories.map((category) => (
              <button key={category} className={workFilter === category ? 'active' : ''} type="button" onClick={() => { setWorkFilter(category); setSelectedWork(0); }}>
                {category}
              </button>
            ))}
          </div>
          <div className="workShowcase">
            <div className="workList" role="tablist" aria-label="Portfolio previews">
              {filteredWorks.map((work, index) => (
                <button key={work.title} className={selectedWork === index ? 'active' : ''} type="button" role="tab" aria-selected={selectedWork === index} onClick={() => setSelectedWork(index)}>
                  <span>{work.category}</span>{work.title}
                </button>
              ))}
            </div>
            <article className="featuredWork tiltCard">
              <img src={activeWork.image} alt={`${activeWork.title} project preview`} />
              <div className="featuredOverlay">
                <p>{activeWork.category}</p>
                <h3>{activeWork.title}</h3>
                <p>{activeWork.description}</p>
                <div>{activeWork.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                <button className="button secondary smallButton" type="button" onClick={() => setModalWorkIndex(works.findIndex((work) => work.title === activeWork.title))}>
                  Open case study
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section resumeSection scrollReveal" aria-labelledby="resume-title">
        <div className="container resumeGrid">
          <div>
            <p className="sectionKicker">Resume Preview</p>
            <h2 id="resume-title">Experience at a glance.</h2>
            <p className="sectionText">A quick interactive version of the resume timeline, with the full CV still available to download.</p>
            <a className="button primary" href="/CV - (QA Automation) - Rhobert Isaac Calem.docx" download>Download full CV</a>
          </div>
          <div className="resumeTimeline">
            {resumeTimeline.map(([year, title, note]) => <article key={`${year}-${title}`}><span>{year}</span><h3>{title}</h3><p>{note}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section testimonialSection scrollReveal" aria-labelledby="testimonial-title">
        <div className="container testimonialGrid">
          <div>
            <p className="sectionKicker">Testimonials</p>
            <h2 id="testimonial-title">Signals from teammates and clients.</h2>
          </div>
          <article className="testimonialCard tiltCard">
            <p>“{testimonials[testimonialIndex][1]}”</p>
            <strong>{testimonials[testimonialIndex][0]}</strong>
            <div className="testimonialDots">
              {testimonials.map((testimonial, index) => <button key={testimonial[0]} className={testimonialIndex === index ? 'active' : ''} type="button" aria-label={`Show testimonial ${index + 1}`} onClick={() => setTestimonialIndex(index)} />)}
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className="section contactSection scrollReveal">
        <div className="container contactGrid">
          <div>
            <p className="sectionKicker">Contact</p>
            <h2>Have a QA or web project in mind?</h2>
            <p className="sectionText">Send a message and I&apos;ll get back to you. I&apos;m available for QA testing, automation support, and quality-focused collaboration.</p>
            <div className="contactList">
              <a href="mailto:isaacsample@gmail.com">✉ isaacsample@gmail.com</a>
              <a href="tel:09156822453">☎ 09156822453</a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
              <a href="/CV - (QA Automation) - Rhobert Isaac Calem.docx" download>Download CV</a>
            </div>
          </div>
          <form className="contactForm tiltCard" onSubmit={handleSubmit}>
            <label>Name<input name="Name" placeholder="Your name" required /></label>
            <label>Email<input type="email" name="Email" placeholder="you@example.com" required /></label>
            <label>Message<textarea name="Message" rows={6} placeholder="Tell me about your project" required /></label>
            <button className="button primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit message'}</button>
            <a className="mailFallback" href="mailto:isaacsample@gmail.com">Or email directly</a>
            {message && <p className="formMessage">{message}</p>}
          </form>
        </div>
      </section>

      <div className={aiOpen ? 'aiWidget open' : 'aiWidget'} aria-live="polite">
        {aiOpen && (
          <div className="aiPanel">
            <div className="aiPanelHeader">
              <div><span>AI</span><strong>Portfolio Guide</strong></div>
              <button type="button" aria-label="Close AI guide" onClick={() => setAiOpen(false)}>×</button>
            </div>
            <div className="aiMessages">
              {aiMessages.map((chat, index) => (
                <p key={`${chat.role}-${index}`} className={chat.role}>
                  {chat.text}
                </p>
              ))}
            </div>
            <div className="aiSuggestions">
              {aiQuickPrompts.slice(0, 3).map((prompt) => (
                <button key={prompt} type="button" onClick={() => sendAiMessage(prompt)}>{prompt}</button>
              ))}
            </div>
            <form className="aiInput" onSubmit={(event) => { event.preventDefault(); sendAiMessage(); }}>
              <input value={aiInput} onChange={(event) => setAiInput(event.target.value)} placeholder="Ask about QA, tools, resume..." />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
        <button className="aiFab" type="button" onClick={() => setAiOpen((open) => !open)} aria-label="Open AI portfolio guide">
          AI
        </button>
      </div>

      {modalWork && (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="case-study-title" onClick={() => setModalWorkIndex(null)}>
          <article className="caseModal" onClick={(event) => event.stopPropagation()}>
            <button className="modalClose" type="button" aria-label="Close case study" onClick={() => setModalWorkIndex(null)}>×</button>
            <img src={modalWork.image} alt={`${modalWork.title} case study`} />
            <div>
              <p className="sectionKicker">{modalWork.category} case study</p>
              <h2 id="case-study-title">{modalWork.title}</h2>
              <p className="sectionText">{modalWork.goal}</p>
              <h3>Tools</h3>
              <div className="modalPills">{modalWork.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <h3>Process</h3>
              <ol>{modalWork.process.map((step) => <li key={step}>{step}</li>)}</ol>
              <h3>Result</h3>
              <p>{modalWork.result}</p>
            </div>
          </article>
        </div>
      )}

      {commandOpen && (
        <div className="commandOverlay" role="dialog" aria-modal="true" aria-label="Command palette" onClick={() => setCommandOpen(false)}>
          <div className="commandPalette" onClick={(event) => event.stopPropagation()}>
            <div className="commandHeader"><span>Quick actions</span><kbd>Esc</kbd></div>
            {commandItems.map(([label, target]) => <button key={label} type="button" onClick={() => jumpTo(target)}>{label}<span>{target}</span></button>)}
          </div>
        </div>
      )}

      <footer>
        <p>© {new Date().getFullYear()} Rhobert Isaac Calem. Quality Assurance Portfolio.</p>
      </footer>
    </main>
  );
}
