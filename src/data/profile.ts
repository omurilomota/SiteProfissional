/**
 * Dados do perfil — única fonte de verdade da identidade, trajetória e stack.
 *
 * REGRA: nada aqui pode ser inventado. Cada item de `timeline` tem `evidence`
 * com o nome real do repositório que comprova aquele período.
 *
 * Campos marcados `null` ainda NÃO foram preenchidos e a seção correspondente
 * é escondida do site automaticamente (ver `missingFields()`), para nunca
 * publicar texto de exemplo como "[preencher]".
 */

export type Link = {
  label: string
  href: string
}

export type Education = {
  course: string
  institution: string
  level: string
  status: string
  /** Previsão de conclusão — o recrutador precisa disso para te encaixar numa vaga. */
  completion: string | null
}

export type Availability = {
  /** Ex.: "Tarde e noite" */
  shift: string | null
  /** Ex.: "Até 30h semanais" */
  hours: string | null
  /** Ex.: "Presencial na região ou remoto" */
  mode: string | null
}

export type TechGroup = {
  area: string
  items: string[]
}

export type Milestone = {
  period: string
  title: string
  description: string
  /** Repositórios reais que comprovam este período. */
  evidence: string[]
}

export const profile = {
  name: 'Murilo Mota',
  role: 'Desenvolvedor backend em formação',
  location: 'Junqueirópolis · São Paulo',

  headline: 'Desenvolvedor backend em formação, com foco em Java e Spring Boot.',

  lede: 'Escrevo código desde 2025. Curso o 3º ano do Ensino Médio com técnico em Jogos Digitais na ETEC Carmelina Barbosa e hoje concentro os estudos em backend, bancos de dados e boas práticas de API. Busco uma oportunidade de estágio em desenvolvimento de software.',

  /**
   * Sobre mim — curto, técnico, sem contar a vida inteira.
   * TODO: revise com suas palavras e ajuste o que quiser destacar.
   */
  about: [
    'Comecei por desenvolvimento de jogos, por causa do curso técnico — passei por C#, Godot e Unity. Foi lá que aprendi a lidar com código que quebra: máquina de estados, colisão, navegação e depuração de sistemas que só fazem sentido quando rodam.',
    'Nos últimos meses migrei o foco para backend. Estudo Java com Spring Boot, modelagem de banco de dados e o que separa um código que funciona de um código que outra pessoa consegue manter: camadas bem definidas, contrato de API estável, tratamento de erro previsível e testes.',
    'Mantenho projetos autorais dos dois lados — APIs REST e aplicações web — e uso cada um para testar uma tecnologia ou uma decisão de arquitetura nova.',
  ],

  // TODO: preencher o LinkedIn quando o perfil estiver organizado.
  links: {
    github: 'https://github.com/omurilomota',
    linkedin: null as string | null,
    email: 'murilohenriquemota935@gmail.com',
    // Gerado por `npm run curriculo` a partir dos próprios dados deste arquivo.
    resume: '/curriculo.pdf' as string | null,
  },

  /** Real, do próprio perfil do GitHub. Falta só a previsão de conclusão. */
  education: {
    course: 'Técnico em Jogos Digitais',
    institution: 'ETEC Carmelina Barbosa',
    level: 'Ensino Médio integrado ao técnico',
    status: '3º ano — em andamento',
    completion: 'Dezembro de 2026',
  } as Education,

  /**
   * Confirmado pelo próprio autor. A carga horária fica em aberto de propósito:
   * é o que se negocia na entrevista, e "a combinar" é mais honesto que um
   * número inventado aqui.
   */
  availability: {
    shift: 'Noite e flexível',
    hours: 'A combinar',
    mode: 'Remoto',
  } as Availability,

  /**
   * Apenas o que aparece de fato nos seus repositórios.
   * A ordem vai da base para o específico.
   */
  techGroups: [
    {
      area: 'Backend',
      items: [
        'Java 21',
        'Spring Boot',
        'Spring Security',
        'JPA / Hibernate',
        'PostgreSQL',
        'Flyway',
        'Bean Validation',
        'OpenAPI',
        'Maven',
        'JUnit',
        'Testcontainers',
      ],
    },
    {
      area: 'Web',
      items: [
        'TypeScript',
        'React 19',
        'Vite',
        'Tailwind CSS',
        'Zustand',
        'i18next',
        'three.js',
        'Vitest',
        'Playwright',
      ],
    },
    {
      area: 'Jogos',
      items: ['C#', 'Godot 4', 'GDScript', 'Unity', 'A* (pathfinding)', 'Máquinas de estado'],
    },
    {
      area: 'Dados e ferramentas',
      items: ['PostgreSQL', 'SQL', 'Git', 'GitHub Actions', 'Linux', 'Vercel'],
    },
  ] satisfies TechGroup[],

  /**
   * Trajetória real, reconstruída a partir do histórico de commits dos seus
   * repositórios (set/2025 → hoje). Isto substitui a "parede de logos".
   */
  timeline: [
    {
      period: 'Set — Dez 2025',
      title: 'Primeiros projetos web',
      description:
        'HTML, CSS e JavaScript em páginas para comércios locais. Primeiro contato com layout responsivo, publicação e ajustes a pedido de quem ia usar o site.',
      evidence: ['site_padaria', 'site-eletrica', 'elitetech-ecommerce', 'QUEIMADOS-site'],
    },
    {
      period: 'Dez 2025 — Fev 2026',
      title: 'React e o primeiro técnico',
      description:
        'Transição para componentes, estado e tipagem com React e TypeScript. O desafio técnico que mais rendeu foi modelar formulários e validação.',
      evidence: ['React-training', 'plataforma-do-vendedor', 'Site_Lista_Tarefas', 'calculadora'],
    },
    {
      period: 'Fev — Abr 2026',
      title: 'Além do navegador',
      description:
        'Mergulho em linguagens de sistema e aplicações desktop. C para entender memória e ponteiros, depois Rust e Tauri para empacotar aplicação nativa.',
      evidence: ['sistema-escola', 'memento', 'Pomodoro-tauri'],
    },
    {
      period: 'Mai 2026',
      title: 'Java e Spring Boot',
      description:
        'Início do backend a sério: camadas Controller/Service/Repository, injeção de dependência e persistência. Resolvi desafios de processo seletivo em Java para consolidar.',
      evidence: ['E-commerce', 'SEI', 'Desafio_itau', 'desafio-itau'],
    },
    {
      period: 'Jun — Jul 2026',
      title: 'Aplicações grandes e em equipe',
      description:
        'Projetos com requisitos de verdade: tempo real, estado global, gráficos 3D no navegador, internacionalização em três idiomas e testes automatizados. Foi também o período em que trabalhei com outras pessoas no mesmo repositório.',
      evidence: ['Olho-Eletronico', 'TrazAi', 'PCMais', 'estacionamento-automatico'],
    },
    {
      period: 'Ago 2026 — hoje',
      title: 'Backend com profundidade',
      description:
        'Foco em qualidade de API: DTOs isolando o contrato da API das entidades, tratamento global de exceção, autenticação com JWT, documentação OpenAPI e auditoria do próprio código em busca de fragilidades.',
      evidence: ['Sorveteria-API', 'Biblioteca-API', 'bookstore'],
    },
  ] satisfies Milestone[],
}

export const getLinks = (): Link[] => {
  const { github, linkedin, email, resume } = profile.links
  const links: Link[] = []
  if (email) links.push({ label: email, href: `mailto:${email}` })
  if (github) links.push({ label: 'GitHub', href: github })
  if (linkedin) links.push({ label: 'LinkedIn', href: linkedin })
  if (resume) links.push({ label: 'Currículo (PDF)', href: resume })
  return links
}

/**
 * Lista os campos obrigatórios que ainda estão vazios.
 * Chamada em desenvolvimento (ver src/main.tsx) para que nada de exemplo
 * chegue à versão publicada.
 */
export const missingFields = (): string[] => {
  const missing: string[] = []
  if (!profile.links.linkedin) missing.push('links.linkedin')
  if (!profile.links.resume) missing.push('links.resume')
  if (!profile.education.completion) missing.push('education.completion')
  if (!profile.availability.shift) missing.push('availability.shift')
  if (!profile.availability.hours) missing.push('availability.hours')
  if (!profile.availability.mode) missing.push('availability.mode')
  return missing
}
