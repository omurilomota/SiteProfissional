import { profile } from '../data/profile'

/** Calculado uma vez, fora da renderização: `new Date()` é impuro em render. */
const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {currentYear} {profile.name} · {profile.location}
        </p>
        <p>Feito com React e TypeScript. Código-fonte aberto.</p>
      </div>
    </footer>
  )
}
