import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { missingFields } from './data/profile'
import { projects } from './data/projects'

/**
 * Em desenvolvimento, avisa no console tudo que ainda falta preencher.
 * É o que impede um texto de exemplo de chegar à versão publicada: as seções
 * com campo vazio simplesmente não são renderizadas.
 */
if (import.meta.env.DEV) {
  const pending = [
    ...missingFields(),
    ...projects.filter((project) => !project.screenshot).map((p) => `captura de tela — ${p.name}`),
    ...projects.filter((project) => !project.repoIsPublic).map((p) => `repositório privado — ${p.name}`),
    ...projects.filter((project) => !project.demo).map((p) => `sem demonstração pública — ${p.name}`),
  ]

  if (pending.length > 0) {
    console.warn(
      `[portfólio] ${pending.length} pendência(s) antes de publicar:\n- ${pending.join('\n- ')}`,
    )
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
