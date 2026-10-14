import { profile } from '../data/profile'

export function Tech() {
  return (
    <section className="section" id="tecnologias" aria-labelledby="tecnologias-titulo">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Tecnologias</span>
          <h2 id="tecnologias-titulo">O que já usei em projeto</h2>
          <p>
            Só entra nesta lista o que aparece de fato nos meus repositórios — não o que já li
            a respeito.
          </p>
        </div>

        <div className="tech-grid">
          {profile.techGroups.map((group) => (
            <div className="tech-group" key={group.area}>
              <h3 className="tech-group__title">{group.area}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
