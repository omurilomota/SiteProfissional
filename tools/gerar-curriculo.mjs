/**
 * Gera `public/curriculo.pdf` a partir dos dados do próprio site.
 *
 * Por que um gerador em vez de um PDF editado à mão: o conteúdo do currículo é
 * o mesmo do portfólio. Editado à mão, o PDF envelhece em silêncio e passa a
 * contradizer a página. Aqui a fonte é a mesma (`src/data/`), então corrigir um
 * número no site e rodar `npm run curriculo` mantém os dois em acordo.
 *
 * Roda com o Node 24, que lê TypeScript direto (só anotações de tipo, sem
 * transformação): não precisa compilar nada antes.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { profile } from '../src/data/profile.ts'
import { projects } from '../src/data/projects.ts'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const html = join(raiz, 'tools', '.curriculo.html')
const pdf = join(raiz, 'public', 'curriculo.pdf')

const SITE = 'https://murilomota.vercel.app'

const esc = (texto) =>
  String(texto).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

const contatos = [
  profile.links.email,
  profile.links.github,
  profile.links.linkedin,
  SITE,
]
  .filter(Boolean)
  .map((c) => esc(c.replace(/^https?:\/\//, '')))
  .join(' &nbsp;·&nbsp; ')

const formacao = [
  `${profile.education.course} — ${profile.education.institution}`,
  profile.education.level,
  profile.education.status,
  profile.education.completion ? `conclusão em ${profile.education.completion}` : null,
]
  .filter(Boolean)
  .map(esc)
  .join(' · ')

const disponibilidade = [
  profile.availability.shift,
  profile.availability.hours,
  profile.availability.mode,
]
  .filter(Boolean)
  .map(esc)
  .join(' · ')

const tecnologias = profile.techGroups
  .map(
    (grupo) =>
      `<p class="linha"><strong>${esc(grupo.area)}:</strong> ${esc(grupo.items.join(', '))}</p>`,
  )
  .join('\n')

const projetos = projects
  .map((p) => {
    const evidencias = p.evidence.slice(0, 2).map(esc).join('; ')
    return `<div class="item">
      <p class="titulo">${esc(p.name)} <span class="meta">${esc(p.stack.slice(0, 5).join(' · '))}</span></p>
      <p class="texto">${esc(p.tagline)}</p>
      <p class="evidencias">${evidencias} — <span class="meta">${esc(p.repo.replace(/^https?:\/\//, ''))}</span></p>
    </div>`
  })
  .join('\n')

const trajetoria = profile.timeline
  .map(
    (m) =>
      `<p class="linha"><strong>${esc(m.period)}</strong> — ${esc(m.title)}</p>`,
  )
  .join('\n')

writeFileSync(
  html,
  `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>Currículo — ${esc(profile.name)}</title>
<style>
  /* Fontes do sistema: o PDF não depende de rede para sair igual. */
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #14212b;
    font: 10.5pt/1.5 -apple-system, "Segoe UI", Roboto, "DejaVu Sans", Arial, sans-serif;
  }
  @page { size: A4; margin: 13mm 14mm; }
  header { border-bottom: 2px solid #14212b; padding-bottom: 6px; margin-bottom: 12px; }
  h1 { margin: 0; font-size: 19pt; letter-spacing: -0.2px; }
  .cargo { margin: 2px 0 0; font-size: 11pt; color: #3b4a56; }
  .contato { margin: 4px 0 0; font-size: 9pt; color: #3b4a56; }
  h2 {
    font-size: 9.5pt; text-transform: uppercase; letter-spacing: 1.1px;
    margin: 14px 0 5px; padding-bottom: 2px; border-bottom: 1px solid #c9d2d9;
  }
  p { margin: 0 0 4px; }
  .linha { margin: 0 0 3px; }
  .item { margin-bottom: 7px; break-inside: avoid; }
  .titulo { font-weight: 600; }
  .meta { font-weight: 400; color: #4b5b68; }
  .texto { color: #2b3945; }
  .evidencias { font-size: 9pt; color: #4b5b68; }
  ul { margin: 0; padding-left: 15px; }
  li { margin-bottom: 2px; }
  footer { margin-top: 12px; font-size: 8.5pt; color: #6b7885; }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.name)}</h1>
    <p class="cargo">${esc(profile.role)} · ${esc(profile.location)}</p>
    <p class="contato">${contatos}</p>
  </header>

  <h2>Resumo</h2>
  <p>${esc(profile.lede)}</p>

  <h2>Formação</h2>
  <p>${formacao}</p>

  <h2>Disponibilidade</h2>
  <p>${disponibilidade}</p>

  <h2>Tecnologias</h2>
  ${tecnologias}

  <h2>Projetos</h2>
  ${projetos}

  <h2>Trajetória</h2>
  ${trajetoria}

  <footer>
    Gerado a partir dos dados publicados em ${SITE} — os números de cada projeto saem do
    próprio repositório e podem ser conferidos no site.
  </footer>
</body>
</html>
`,
)

const chrome = existsSync('/usr/bin/google-chrome')
  ? '/usr/bin/google-chrome'
  : '/usr/bin/google-chrome-stable'

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdf}`,
    `file://${html}`,
  ],
  { stdio: 'ignore' },
)

unlinkSync(html)
console.log(`✅ ${pdf.replace(raiz + '/', '')} gerado a partir de src/data/`)
