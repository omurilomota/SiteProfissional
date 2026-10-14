import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="container notfound">
      <h1>Página não encontrada</h1>
      <p>
        O endereço que você abriu não existe aqui. Talvez o link esteja incompleto ou o projeto
        tenha sido renomeado.
      </p>
      <Link className="btn btn--primary" to="/">
        Voltar para o início
      </Link>
    </section>
  )
}
