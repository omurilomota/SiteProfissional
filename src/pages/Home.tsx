import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Tech } from '../components/Tech'
import { Trajectory } from '../components/Trajectory'

export function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Trajectory />
      <About />
      <Tech />
      <Contact />
    </>
  )
}
