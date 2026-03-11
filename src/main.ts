/**
 * main.ts — Portfolio entry point
 * - Builds the stack marquee dynamically
 * - Smooth scroll for nav links
 */

// ─────────────────────────────────────────────
// STACK MARQUEE
// ─────────────────────────────────────────────

const stackTechs: string[] = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
]

/**
 * Creates a single stack card element.
 */
function createStackCard(name: string): HTMLDivElement {
  const card = document.createElement('div')
  card.className = 'stack-card'
  card.textContent = name
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

document.addEventListener('DOMContentLoaded', () => {
  buildMarquee()
  initSmoothScroll()
})
