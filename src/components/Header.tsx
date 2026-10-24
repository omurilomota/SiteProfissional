import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'
import { ThemeToggle } from './ThemeToggle'

const sections = [
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#trajetoria', label: 'Trajetória' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#contato', label: 'Contato' },
]

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [active, setActive] = useState<string | null>(null)

  /**
   * Destaca no menu a seção visível. Usa IntersectionObserver para não
   * recalcular posições a cada evento de scroll.
   */
  useEffect(() => {
    const ids = sections.map((section) => section.href.split('#')[1])
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.5] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
    // `pathname` reata o observer ao voltar de uma página de projeto para a home,
    // onde as seções observadas não existiam no momento da montagem.
  }, [pathname])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" to="/">
          {profile.name}
          <span className="brand__dot">.dev</span>
        </Link>

        <nav aria-label="Seções do site">
          <ul className="nav">
            {sections.map((section) => (
              <li key={section.href}>
                <Link
                  className={
                    isHome && active === section.href.split('/')[1]
                      ? 'nav__link nav__link--active'
                      : 'nav__link'
                  }
                  to={section.href}
                  aria-current={
                    isHome && active === section.href.split('/')[1] ? 'true' : undefined
                  }
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
