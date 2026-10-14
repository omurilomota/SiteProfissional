import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

/** Monta os blocos de contexto do hero, omitindo o que ainda não foi preenchido. */
function buildMetaItems() {
  const { education, availability, location } = profile
  const items: { label: string; value: string }[] = []

  items.push({
    label: 'Formação',
    value: `${education.course} · ${education.institution}${
      education.completion ? ` (conclusão em ${education.completion})` : ''
    }`,
  })

  const availabilityParts = [availability.shift, availability.hours, availability.mode].filter(
    (part): part is string => part !== null && part !== '',
  )

  if (availabilityParts.length > 0) {
    items.push({ label: 'Disponibilidade', value: availabilityParts.join(' · ') })
  }

  if (location) {
    items.push({ label: 'Localização', value: location })
  }

  return items
}

export function Hero() {
  const metaItems = buildMetaItems()

  return (
    <section className="hero" aria-labelledby="apresentacao">
      <div className="container">
        <p className="eyebrow hero__eyebrow">
          <span aria-hidden="true">●</span>
          Desenvolvimento de software · {profile.location}
        </p>

        <h1 className="hero__title" id="apresentacao">
          {profile.headline}
        </h1>

        <p className="hero__lede">{profile.lede}</p>

        <div className="hero__actions">
          <Link className="btn btn--primary" to="/#projetos">
            Explorar projetos
          </Link>
          <ExternalLink className="btn btn--ghost" href={profile.links.github}>
            GitHub
          </ExternalLink>
        </div>

        {metaItems.length > 0 && (
          <dl className="hero__meta">
            {metaItems.map((item) => (
              <div className="meta-item" key={item.label}>
                <dt className="meta-item__label">{item.label}</dt>
                <dd className="meta-item__value">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
