import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'

/**
 * Depois de trocar de rota, rola até a âncora do endereço — é o que faz
 * "/#projetos" vindo de uma página de projeto funcionar.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main className="app__main" id="conteudo">
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
