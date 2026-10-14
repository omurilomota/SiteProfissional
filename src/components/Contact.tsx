import { getLinks, profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

export function Contact() {
  const links = getLinks()

  return (
    <section className="section" id="contato" aria-labelledby="contato-titulo">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Contato</span>
          <h2 id="contato-titulo">Vamos conversar</h2>
          <p>
            Estou à procura de uma oportunidade de estágio em desenvolvimento de software. Se
            quiser discutir algum projeto ou marcar uma conversa, {profile.name} responde por
            aqui.
          </p>
        </div>

        <div className="contact__links">
          {links.map((link) =>
            link.href.startsWith('http') ? (
              <ExternalLink className="btn btn--ghost" href={link.href} key={link.href}>
                {link.label}
              </ExternalLink>
            ) : (
              <a className="btn btn--primary" href={link.href} key={link.href}>
                {link.label}
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
