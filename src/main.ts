/**
 * main.ts — Portfolio entry point
 * - Builds the stack marquee dynamically
 * - Smooth scroll for nav links
 * - Initialises the hero 3D particle swarm
 * - i18n language toggle (EN / PT)
 */

import { initHero3D } from './hero3d'

// ─────────────────────────────────────────────
// i18n
// ─────────────────────────────────────────────

type Lang = 'en' | 'pt'

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav-services': 'Services',
    'nav-projects': 'Projects',
    'nav-about': 'About Me',
    'hero-greeting': "Hi, I'm ",
    'hero-location': 'Based in Brazil',
    'hero-cta': 'Hire Me',
    'services-heading': 'Services',
    'service1-title': 'AI & Intelligent Automation',
    'service1-text': 'Designing AI-driven <span class="text-accent">solutions</span> and intelligent workflows that <span class="text-accent-bright">optimize</span> operations, <span class="text-accent">reduce</span> manual effort, and <span class="text-accent">improve</span> decision-making.',
    'service3-title': 'Process Automation',
    'service3-text': 'Developing <span class="text-accent-bright">automated</span> processes and digital workflows that increase <span class="text-accent-bright">efficiency</span>, ensure consistency, and support business <span class="text-accent-bright">scalability</span>.',
    'service4-title': 'Systems Integration',
    'service4-text': '<span class="text-accent-bright">Integrating</span> platforms, databases, and third-party services to create connected, reliable, and <span class="text-accent-bright">efficient</span> digital ecosystems.',
    'service2-text': 'Building responsive, <span class="text-accent-bright">high-performance</span> web applications with <span class="text-accent-bright">clean</span> architecture, modern technologies, and a strong focus on <span class="text-accent-bright">usability</span>.',
    'projects-heading': 'Projects',
    'projects-view-all': 'View All',
    'project-mobile-app': 'Mobile App',
    'project-web-app': 'Web App',
    'about-heading': 'About Me',
    'about-bio1': 'I\'m a <span class="text-bright">Full Stack</span> Developer with experience building <span class="text-dark">web</span> and <span class="text-bright">mobile</span> applications, <span class="text-bright">automations</span>, and system <span class="text-bright">integrations</span>. I work across the full development cycle, from creating new features to maintaining and improving existing systems, <span class="text-bright">always</span> focusing on performance, scalability, and clean architecture.',
    'about-bio2': '<span class="text-bright">My</span> background <span class="text-bright">includes</span> working with React, TypeScript, JavaScript, HTML, CSS, PHP, Python, C#, .NET, Node.js, PostgreSQL, MySQL, and Docker. I also have <span class="text-bright">experience</span> integrating APIs and third-party services, writing <span class="text-bright">maintainable</span> code, testing applications, and collaborating closely with design, product, and QA teams to deliver reliable and <span class="text-dark">user-focused solutions</span>.',
    'cta-heading': "Let's create<br />something together",
    'cta-btn': 'Book a Call',
    'modal-title': "Let's work together",
    'modal-sub': "Fill in the form and I'll get back to you shortly.",
    'modal-name-label': 'Name',
    'modal-name-placeholder': 'Your name',
    'modal-email-label': 'Email',
    'modal-message-label': 'Message',
    'modal-message-placeholder': 'Tell me about your project...',
    'modal-submit': 'Send Message',
  },
  pt: {
    'nav-services': 'Serviços',
    'nav-projects': 'Projetos',
    'nav-about': 'Sobre Mim',
    'hero-greeting': 'Olá, sou ',
    'hero-location': 'Baseado no Brasil',
    'hero-cta': 'Contrate-me',
    'services-heading': 'Serviços',
    'service1-title': 'IA & Automação Inteligente',
    'service1-text': 'Criando <span class="text-accent">soluções</span> com IA e automações inteligentes que <span class="text-accent-bright">otimizam</span> operações, <span class="text-accent">eliminam</span> tarefas repetitivas e <span class="text-accent">potencializam</span> a tomada de decisões.',
    'service3-title': 'Automação de Processos',
    'service3-text': 'Desenvolvendo processos <span class="text-accent-bright">automatizados</span> e fluxos digitais que aumentam a <span class="text-accent-bright">produtividade</span>, garantem consistência e impulsionam a <span class="text-accent-bright">escalabilidade</span> do negócio.',
    'service4-title': 'Integração de Sistemas',
    'service4-text': '<span class="text-accent-bright">Conectando</span> plataformas, bancos de dados e serviços externos para criar ecossistemas digitais integrados, confiáveis e <span class="text-accent-bright">eficientes</span>.',
    'service2-text': 'Construindo aplicações web responsivas e de <span class="text-accent-bright">alta performance</span>, com arquitetura <span class="text-accent-bright">limpa</span>, tecnologias modernas e foco total em <span class="text-accent-bright">experiência do usuário</span>.',
    'projects-heading': 'Projetos',
    'projects-view-all': 'Ver Todos',
    'project-mobile-app': 'App Mobile',
    'project-web-app': 'App Web',
    'about-heading': 'Sobre Mim',
    'about-bio1': 'Sou desenvolvedor <span class="text-bright">Full Stack</span> com experiência na criação de aplicações <span class="text-dark">web</span> e <span class="text-bright">mobile</span>, <span class="text-bright">automações</span> e <span class="text-bright">integrações</span> de sistemas. Atuo em todo o ciclo de desenvolvimento — da concepção de novas funcionalidades à manutenção e evolução de sistemas existentes — <span class="text-bright">sempre</span> priorizando performance, escalabilidade e arquitetura limpa.',
    'about-bio2': 'Tenho experiência com <span class="text-bright">React</span>, TypeScript, JavaScript, HTML, CSS, PHP, Python, C#, .NET, Node.js, PostgreSQL, MySQL e Docker. Também atuo na integração de APIs e serviços externos, na escrita de código <span class="text-bright">manutenível</span>, em testes de aplicações e na colaboração com equipes de design, produto e QA para entregar soluções <span class="text-bright">confiáveis</span> e <span class="text-dark">centradas no usuário</span>.',
    'cta-heading': 'Vamos criar<br />algo juntos',
    'cta-btn': 'Agendar uma Conversa',
    'modal-title': 'Vamos trabalhar juntos',
    'modal-sub': 'Preencha o formulário e entro em contato em breve.',
    'modal-name-label': 'Nome',
    'modal-name-placeholder': 'Seu nome',
    'modal-email-label': 'E-mail',
    'modal-message-label': 'Mensagem',
    'modal-message-placeholder': 'Me conte sobre o seu projeto...',
    'modal-submit': 'Enviar Mensagem',
  },
}

let currentLang: Lang = 'en'

function applyTranslations(lang: Lang): void {
  const t = translations[lang]
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!
    if (key in t) el.textContent = t[key]
  })
  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml!
    if (key in t) el.innerHTML = t[key]
  })
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = (el as HTMLElement).dataset.i18nPlaceholder!
    if (key in t) el.placeholder = t[key]
  })
  document.documentElement.lang = lang
}

const langToggleBtn = document.getElementById('langToggle')!
langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'pt' : 'en'
  applyTranslations(currentLang)
  langToggleBtn.textContent = currentLang === 'en' ? 'PT' : 'EN'
})

// ─────────────────────────────────────────────
// STACK MARQUEE
// ─────────────────────────────────────────────

const stackTechs: { name: string; icon: string }[] = [
  { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'PHP',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C#',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: '.NET',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
]

/**
 * Creates a single stack card element.
 */
function createStackCard(tech: { name: string; icon: string }): HTMLDivElement {
  const card = document.createElement('div')
  card.className = 'stack-card'

  const img = document.createElement('img')
  img.src = tech.icon
  img.alt = tech.name
  img.className = 'stack-card__icon'

  const label = document.createElement('span')
  label.className = 'stack-card__label'
  label.textContent = tech.name

  card.appendChild(img)
  card.appendChild(label)
  return card
}

/**
 * Fills the marquee with two identical sets of cards so the CSS
 * animation can seamlessly loop back to the start once it has
 * translated -50% (one full set width).
 *
 * Initial offset: the Figma spec shows the track starting at
 * left: -110px — we apply this via a CSS translate on the wrapper.
 */
function buildMarquee(): void {
  const marquee = document.getElementById('stackMarquee')
  if (!marquee) return

  // Two copies for seamless loop
  const allTechs = [...stackTechs, ...stackTechs]

  const fragment = document.createDocumentFragment()
  allTechs.forEach((tech) => {
    fragment.appendChild(createStackCard(tech))
  })

  marquee.appendChild(fragment)

  // rAF-based infinite scroll — no CSS animation flick on reset
  const SPEED = 80 // px/s
  let offset = 0
  let last = performance.now()
  const track = marquee

  function tick(now: number) {
    const dt = Math.min((now - last) / 1000, 0.1) // cap dt to avoid big jumps
    last = now
    offset += SPEED * dt
    const half = track.scrollWidth / 2
    if (offset >= half) offset -= half
    track.style.transform = `translateX(-${offset}px)`
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

// ─────────────────────────────────────────────
// SMOOTH SCROLL
// ─────────────────────────────────────────────

/**
 * Intercepts clicks on elements with class `.nav-scroll` and
 * smoothly scrolls to the target section.
 */
function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a.nav-scroll').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      const target = document.querySelector<HTMLElement>(href)
      if (!target) return

      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

buildMarquee()
initSmoothScroll()

// ─────────────────────────────────────────────
// HIRE ME MODAL
// ─────────────────────────────────────────────
const modal = document.getElementById('hireMeModal')!
const openBtn = document.getElementById('hireMeBtn')!
const closeBtn = modal.querySelector<HTMLButtonElement>('.modal__close')!
const overlay = modal.querySelector<HTMLDivElement>('.modal__overlay')!
const modalBox = modal.querySelector<HTMLElement>('.modal__box')!

function openModal() {
  const rect = openBtn.getBoundingClientRect()
  const fromX = (rect.left + rect.width / 2) - window.innerWidth / 2
  const fromY = (rect.top + rect.height / 2) - window.innerHeight / 2
  modalBox.style.setProperty('--from-x', `${fromX}px`)
  modalBox.style.setProperty('--from-y', `${fromY}px`)

  modal.classList.remove('is-closing')
  modal.classList.add('is-open')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  if (!modal.classList.contains('is-open') || modal.classList.contains('is-closing')) return
  modal.classList.add('is-closing')
  modalBox.addEventListener('animationend', () => {
    modal.classList.remove('is-open', 'is-closing')
    document.body.style.overflow = ''
  }, { once: true })
}

openBtn.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() })

// ─────────────────────────────────────────────
// HERO 3D
// ─────────────────────────────────────────────
const hero3dContainer = document.getElementById('hero3d')
if (hero3dContainer) {
  const ro = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect
    if (width > 0 && height > 0) {
      ro.disconnect()
      initHero3D(hero3dContainer)
    }
  })
  ro.observe(hero3dContainer)
}
