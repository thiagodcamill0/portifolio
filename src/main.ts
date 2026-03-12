/**
 * main.ts — Portfolio entry point
 * - Builds the stack marquee dynamically
 * - Smooth scroll for nav links
 * - Initialises the hero 3D particle swarm
 */

import { initHero3D } from './hero3d'

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

  // Apply the -110px initial offset from the Figma spec
  marquee.style.marginLeft = '-110px'
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
