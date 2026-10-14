import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { ExternalLink } from './ExternalLink'

export function Projects() {
  return (
    <section className="section" id="projetos" aria-labelledby="projetos-titulo">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Projetos selecionados</span>
          <h2 id="projetos-titulo">Trabalho que dá para verificar</h2>
          <p>
            Cada cartão traz apenas números que existem no repositório — commits, linhas,
            endpoints e testes. O que ainda não está implementado aparece marcado como planejado
            dentro de cada projeto.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={
                project.featured
                  ? 'project-card project-card--featured'
                  : 'project-card'
              }
              key={project.slug}
            >
              {project.screenshot && (
                <img
                  alt={`Captura de tela do projeto ${project.name}`}
                  className="project-card__preview"
                  loading="lazy"
                  src={project.screenshot}
                />
              )}

              <div className="project-card__body">
                <div className="project-card__head">
                  <h3 className="project-card__title">
                    <Link to={`/projetos/${project.slug}`}>{project.name}</Link>
                  </h3>
                  <span
                    className={
                      project.status.tone === 'shipped'
                        ? 'status status--shipped'
                        : 'status'
                    }
                  >
                    <span className="status__dot" aria-hidden="true" />
                    {project.status.label}
                  </span>
                </div>

                <p className="project-card__tagline">{project.tagline}</p>

                <ul className="project-card__metrics">
                  {project.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="project-card__footer">
                  <ul className="chips">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  <div className="project-card__links">
                    <Link className="link" to={`/projetos/${project.slug}`}>
                      Ver detalhes
                      <span className="link__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>

                    {project.repoIsPublic ? (
                      <ExternalLink href={project.repo}>Código-fonte</ExternalLink>
                    ) : (
                      <span className="project-card__private">
                        Repositório disponível sob solicitação
                      </span>
                    )}

                    {project.demo && (
                      <ExternalLink href={project.demo}>Demonstração</ExternalLink>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
