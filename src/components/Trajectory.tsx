import { profile } from '../data/profile'

/**
 * Trajetória reconstruída do histórico real de commits. Cada etapa lista os
 * repositórios que a comprovam — por isso é verificável, e não uma lista de
 * tecnologias sem contexto.
 */
export function Trajectory() {
  return (
    <section className="section" id="trajetoria" aria-labelledby="trajetoria-titulo">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Trajetória</span>
          <h2 id="trajetoria-titulo">Como cheguei até aqui</h2>
          <p>
            Recapitulando meus repositórios por data de commit. Os nomes em cada etapa são os
            projetos que comprovam aquele período.
          </p>
        </div>

        <ol className="timeline">
          {profile.timeline.map((milestone) => (
            <li className="milestone" key={milestone.period}>
              <span className="milestone__period">{milestone.period}</span>
              <div>
                <h3 className="milestone__title">{milestone.title}</h3>
                <p className="milestone__desc">{milestone.description}</p>
                <ul className="milestone__evidence">
                  {milestone.evidence.map((repo) => (
                    <li key={repo}>{repo}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
