import { Link, useParams } from 'react-router-dom'
import { ExternalLink } from '../components/ExternalLink'
import { getProject } from '../data/projects'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) return <NotFound />

  const done = project.detail.features.filter((feature) => feature.state === 'pronto')
  const planned = project.detail.features.filter((feature) => feature.state === 'planejado')

  return (
    <article>
      <header className="section section--flush detail__header">
        <div className="container">
          <Link className="detail__back" to="/#projetos">
            <span aria-hidden="true">←</span> Todos os projetos
          </Link>

          <span
            className={project.status.tone === 'shipped' ? 'status status--shipped' : 'status'}
          >
            <span className="status__dot" aria-hidden="true" />
            {project.status.label}
          </span>

          <h1 className="detail__title">{project.name}</h1>
          <p className="detail__tagline">{project.tagline}</p>

          <ul className="detail__metrics">
            {project.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="detail__actions">
            {project.repoIsPublic && (
              <ExternalLink className="btn btn--primary" href={project.repo}>
                Código-fonte
              </ExternalLink>
            )}
            {project.demo && (
              <ExternalLink className="btn btn--ghost" href={project.demo}>
                Ver funcionando
              </ExternalLink>
            )}
          </div>
        </div>
      </header>

      {project.screenshot && (
        <section className="section" aria-label="Captura de tela do projeto">
          <div className="container">
            <figure className="detail__figure">
              <img
                alt={`Captura de tela do projeto ${project.name}`}
                src={project.screenshot}
              />
              <figcaption className="detail__caption">
                Captura da aplicação em execução.
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="problema">
        <div className="container">
          <div className="section__head">
            <h2 id="problema">O problema</h2>
          </div>
          <p className="lede">{project.detail.problem}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="solucao">
        <div className="container">
          <div className="section__head">
            <h2 id="solucao">A solução</h2>
          </div>
          <p className="lede">{project.detail.solution}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="funcionalidades">
        <div className="container">
          <div className="section__head">
            <h2 id="funcionalidades">Funcionalidades</h2>
            <p>
              O que está implementado e o que ainda está no papel, listado separadamente. Nada
              aqui é apresentado como pronto sem estar no repositório.
            </p>
          </div>

          <ul className="feature-list">
            {done.map((feature) => (
              <li key={feature.text}>
                <span className="feature-list__icon feature-list__icon--done" aria-hidden="true">
                  ✓
                </span>
                <span>
                  {feature.text}
                  <span className="visually-hidden"> — implementado</span>
                </span>
              </li>
            ))}
          </ul>

          {planned.length > 0 && (
            <>
              <h3 className="tech-group__title" style={{ marginTop: '2rem' }}>
                Planejado
              </h3>
              <ul className="feature-list feature-list--planned">
                {planned.map((feature) => (
                  <li key={feature.text}>
                    <span
                      className="feature-list__icon feature-list__icon--planned"
                      aria-hidden="true"
                    >
                      ○
                    </span>
                    <span>
                      {feature.text}
                      <span className="visually-hidden"> — ainda não implementado</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="decisoes">
        <div className="container">
          <div className="section__head">
            <h2 id="decisoes">Decisões técnicas</h2>
            <p>
              As escolhas que exigiram pensar antes de escrever, e o motivo de cada uma.
            </p>
          </div>

          <div className="decisions">
            {project.detail.decisions.map((decision) => (
              <div className="decision" key={decision.title}>
                <h3 className="decision__title">{decision.title}</h3>
                <p className="decision__body">{decision.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.detail.next.length > 0 && (
        <section className="section" aria-labelledby="proximos">
          <div className="container">
            <div className="section__head">
              <h2 id="proximos">Próximos passos</h2>
            </div>
            <ul className="next-list">
              {project.detail.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Link className="btn btn--ghost" to="/#contato">
            Falar comigo
          </Link>
        </div>
      </section>
    </article>
  )
}
