import { profile } from '../data/profile'

export function About() {
  return (
    <section className="section" id="sobre" aria-labelledby="sobre-titulo">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Sobre mim</span>
          <h2 id="sobre-titulo">Do curso de jogos ao backend</h2>
        </div>

        <div className="prose">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
