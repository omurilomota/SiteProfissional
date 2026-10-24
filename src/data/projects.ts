/**
 * Projetos apresentados no site — única fonte de verdade.
 *
 * REGRA DE HONESTIDADE
 * --------------------
 * - `features` marca cada funcionalidade como 'pronto' (existe no código) ou
 *   'planejado' (ainda não existe). Nunca promova uma funcionalidade planejada.
 * - `evidence` só aceita números verificáveis no repositório (commits,
 *   endpoints, arquivos de teste). Nada de "muito" ou "vários".
 * - `repoIsPublic: false` mantém o cartão honesto: o link só vira clicável
 *   depois que o repositório realmente estiver público.
 */

export type FeatureState = 'pronto' | 'planejado'

export type Project = {
  slug: string
  name: string
  tagline: string
  featured: boolean
  status: { label: string; tone: 'shipped' | 'active' }
  stack: string[]
  repo: string
  repoIsPublic: boolean
  demo: string | null
  /** Captura real da aplicação: salve o arquivo em /public/projetos/ e aponte aqui. */
  screenshot: string | null
  evidence: string[]
  detail: {
    problem: string
    solution: string
    features: { text: string; state: FeatureState }[]
    decisions: { title: string; body: string }[]
    /** Só preencha se houver roadmap real no repositório. Deixe vazio se não houver. */
    next: string[]
  }
}

export const projects: Project[] = [
  {
    slug: 'sorveteria-api',
    name: 'Sorveteria-API',
    tagline:
      'API REST para uma operação de sorveteria: catálogo, clientes e pedidos com cálculo de total e transição de status.',
    featured: true,
    status: { label: 'Em desenvolvimento ativo', tone: 'active' },
    stack: [
      'Java 21',
      'Spring Boot',
      'Spring Security',
      'JPA / Hibernate',
      'PostgreSQL',
      'Flyway',
      'Testcontainers',
      'OpenAPI',
      'Maven',
    ],
    repo: 'https://github.com/omurilomota/Sorveteria-API',
    repoIsPublic: true,
    // Sem demonstração pública: a API exige banco e não expõe servidor aberto.
    demo: null,
    // Swagger UI da própria API em execução local, com os endpoints documentados.
    screenshot: '/projetos/sorveteria-api.webp',
    evidence: [
      '1.379 linhas de Java',
      '22 endpoints em 4 controllers',
      '30 testes contra PostgreSQL real',
    ],
    detail: {
      problem:
        'Uma sorveteria precisa controlar sabores, produtos e pedidos sem planilha, e sem expor os dados dos clientes. O objetivo do projeto era treinar Java e Spring Boot em um domínio com regras de verdade: preço, estoque, composição de pedido e mudança de status.',
      solution:
        'Uma API REST em Java 21 e Spring Boot, com persistência via JPA/Hibernate, autenticação por JWT e documentação OpenAPI gerada a partir do próprio código. Nenhuma entidade do banco é exposta diretamente: a superfície da API é composta apenas por `record`s de request e response.',
      features: [
        { text: 'CRUD de sabores, produtos e clientes', state: 'pronto' },
        { text: 'Pedidos com itens, cálculo de total e transição de status validada', state: 'pronto' },
        { text: 'DTOs isolando o contrato da API das entidades JPA', state: 'pronto' },
        { text: 'Tratamento global de exceções com respostas de erro padronizadas', state: 'pronto' },
        {
          text: 'Autenticação por JWT e proteção dos endpoints (hoje o filtro é uma classe vazia e todos os endpoints estão liberados)',
          state: 'planejado',
        },
        { text: 'Senhas armazenadas com hash BCrypt', state: 'pronto' },
        { text: 'CPF mascarado nas respostas (123.***.***-45)', state: 'pronto' },
        { text: 'Documentação da API com OpenAPI', state: 'pronto' },
        { text: 'Testes de integração dos quatro controllers, com transações revertidas', state: 'pronto' },
        { text: 'Schema versionado com Flyway, validado contra as entidades a cada teste', state: 'pronto' },
        { text: 'Ambiente público para avaliação', state: 'planejado' },
      ],
      decisions: [
        {
          title: 'DTOs como `record` em vez de expor entidades',
          body: 'Servir as entidades JPA direto nos endpoints acopla o contrato da API ao modelo do banco: renomear uma coluna quebra o cliente. Por isso cada entidade tem um par de `record`s de request e response, e o mapeamento fica isolado em mappers. O custo é mais código; o ganho é poder mudar o banco sem avisar quem consome a API.',
        },
        {
          title: 'Tratamento de erro centralizado',
          body: 'Em vez de cada controller montar a própria resposta de erro, existe um `GlobalExceptionHandler` e exceções de domínio com nome do problema: CPF já cadastrado, e-mail já cadastrado, produto não encontrado, transição de status inválida. Cada uma é mapeada para o status HTTP correto, e o cliente da API recebe sempre o mesmo formato de erro.',
        },
        {
          title: 'Auditar o próprio código antes de mostrar para alguém',
          body: 'Depois de a API funcionar, fiz uma auditoria completa e registrei 37 achados classificados por criticidade — de bug explorável a melhoria de estilo. Os mais graves estavam em segurança: a senha era gravada sem hash e um dos campos de resposta devolvia o telefone no lugar do CPF. Ambos foram corrigidos. O documento é o registro do que ainda falta.',
        },
        {
          title: 'Trocar o schema automático por migrações versionadas',
          body: 'Antes o Hibernate criava e alterava as tabelas sozinho. Funciona, e é um problema: o schema passa a existir só dentro do banco, não fica no Git e não há como saber qual versão está aplicada em cada ambiente. Agora o schema é um arquivo SQL versionado com Flyway, e o Hibernate roda em modo `validate` — ele não altera nada e falha na inicialização se alguma entidade deixar de bater com a migração. Isso transforma um erro silencioso em um erro que aparece antes de subir.',
        },
      ],
      next: [
        'Implementar a autenticação por JWT de verdade e restringir o acesso aos endpoints',
        'Publicar uma instância acessível para avaliação',
      ],
    },
  },

  {
    slug: 'olho-eletronico',
    name: 'Olho Eletrônico',
    tagline:
      'Sistema web de simulação e monitoramento da Copa do Mundo de 2026, com análise de impedimento em 3D e uma central de comando com gêmeos digitais.',
    featured: false,
    status: { label: 'Concluído · deploy na Vercel', tone: 'shipped' },
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'three.js',
      'Zustand',
      'Supabase',
      'i18next',
      'Vitest',
      'Playwright',
    ],
    repo: 'https://github.com/omurilomota/Olho-Eletronico',
    repoIsPublic: true,
    // Verificado em 14/10/2026: responde HTTP 200 na Vercel.
    demo: 'https://olho-eletronico.vercel.app',
    // Captura da tela inicial (1600×1000, a proporção do cartão).
    screenshot: '/projetos/olho-eletronico.png',
    evidence: ['116 commits em 3 semanas', '9 arquivos de teste + 3 suítes end-to-end', 'interface em 3 idiomas'],
    detail: {
      problem:
        'O impedimento no futebol é uma decisão difícil de visualizar: depende de posições em três dimensões e do instante exato do passe. Um sistema que reconstrói a jogada em 3D ajuda a entender a regra — e servia, no projeto, como desculpa para trabalhar com geometria, câmera e visualização de dados no navegador.',
      solution:
        'Dois módulos independentes no mesmo app. O SAOT Lab monta campo, jogadores, gols e estádio de forma procedural e calcula o impedimento a partir das posições; a central de comando (ICC) reúne gêmeos digitais, indicadores operacionais, painéis de status e exportação de relatórios em PDF.',
      features: [
        { text: 'Campo, jogadores e estádio gerados proceduralmente em 3D', state: 'pronto' },
        { text: 'Cálculo de impedimento a partir das posições dos jogadores', state: 'pronto' },
        { text: 'Linha de impedimento e controles de câmera', state: 'pronto' },
        { text: 'Central de comando com gêmeo digital e painéis operacionais', state: 'pronto' },
        { text: 'Interface em português, inglês e espanhol', state: 'pronto' },
        { text: 'Multiplayer em tempo real com Supabase', state: 'pronto' },
        { text: 'Exportação de relatórios em PDF', state: 'pronto' },
        { text: 'Testes unitários com Vitest e end-to-end com Playwright', state: 'pronto' },
        { text: 'Chat de IA com um modelo de verdade (hoje as respostas são simuladas)', state: 'planejado' },
      ],
      decisions: [
        {
          title: 'Separar o app por domínio, não por tipo de arquivo',
          body: 'O código é organizado em módulos (saot, icc, multiplayer, notifications), e cada módulo carrega os próprios componentes, stores e serviços. Agrupar por tipo — todas as pastas de componentes juntas — parece mais organizado no começo e vira um labirinto quando o projeto cresce.',
        },
        {
          title: 'Estado global com Zustand em vez de Context',
          body: 'A simulação atualiza posições continuamente, e um Context do React re-renderiza a árvore inteira a cada mudança. Com stores separadas por módulo, cada componente assina só o pedaço de estado que usa.',
        },
        {
          title: 'Escrever os testes durante, não no fim',
          body: 'As suítes end-to-end cobrem os três fluxos principais: login, central de comando e o laboratório de impedimento. Eles já apontaram regressões em refatorações de store que passariam despercebidas numa verificação manual.',
        },
      ],
      next: [
        'Ampliar a cobertura end-to-end além dos três fluxos atuais',
        'Substituir as respostas simuladas do chat por um modelo real',
      ],
    },
  },

  {
    slug: 'estacionamento-autonomo',
    name: 'Estacionamento Autônomo',
    tagline:
      'Simulação de estacionamento autônomo: o carro não segue script, ele lê o ambiente por sensores e decide quando procurar vaga, desviar e estacionar.',
    featured: false,
    status: { label: 'Concluído · build exportada', tone: 'shipped' },
    stack: ['Godot 4', 'GDScript', 'A* (pathfinding)', 'Máquina de estados'],
    repo: 'https://github.com/omurilomota/estacionamento-automatico-godot',
    repoIsPublic: true,
    // Verificado em 14/10/2026: build web publicada na Vercel, responde HTTP 200.
    demo: 'https://estacionamento-automatico.vercel.app',
    // Captura da tela inicial (1600×1000, a proporção do cartão).
    screenshot: '/projetos/estacionamento-autonomo.webp',
    evidence: [
      '152 commits em 7 semanas',
      'projeto em equipe de 3 pessoas',
      'build exportada para desktop',
    ],
    detail: {
      problem:
        'Entender na prática como um veículo autônomo decide: ele não conhece o mapa inteiro, recebe apenas o que os sensores captam naquele instante e precisa agir mesmo assim. Era também a oportunidade de trabalhar em equipe com divisão real de responsabilidades.',
      solution:
        'Uma simulação em Godot 4 com o veículo controlado por uma máquina de estados (procurando vaga, desviando, alinhando, estacionado, recuperando) alimentada por sensores RayCast2D, e planejamento de rota com A* sobre uma grade de ocupação. O trabalho foi dividido em três frentes — arte, comportamento do veículo e mundo — com responsáveis definidos por arquivo.',
      features: [
        { text: 'Planejamento de rota com A* sobre grade de ocupação', state: 'pronto' },
        { text: 'Sensores por RayCast2D alimentando a decisão do veículo', state: 'pronto' },
        {
          text: 'Máquina de estados com recuperação de erro após colisão',
          state: 'pronto',
        },
        { text: 'Detecção de vagas livres e alinhamento para estacionar', state: 'pronto' },
        { text: 'Minimapa e níveis com dificuldade progressiva', state: 'pronto' },
        { text: 'Build exportada para Windows e Linux', state: 'pronto' },
        { text: 'Tráfego com múltiplos veículos simultâneos', state: 'planejado' },
        { text: 'Aprendizado de máquina no lugar de regras fixas', state: 'planejado' },
      ],
      decisions: [
        {
          title: 'Separar decisão de execução',
          body: 'O veículo não chama comandos de movimento de qualquer lugar. A máquina de estados decide o objetivo, e o controle de locomoção é o único que mexe no corpo do veículo. Quando o carro travava ao entrar na vaga, isso permitiu isolar o erro: a decisão estava certa e o controle estava errado.',
        },
        {
          title: 'O estado RECOVERING não é enfeite',
          body: 'Colisão acontece em simulação de física, e sem tratamento o veículo ficava preso contra a parede para sempre. O estado de recuperação detecta que houve colisão e recua antes de replanejar a rota — foi a mudança que deixou a simulação estável em execuções longas.',
        },
      ],
      next: [
        'Tráfego com múltiplos veículos disputando as mesmas vagas',
        'Modo de aprendizado: substituir parte das regras fixas por um modelo treinado',
      ],
    },
  },

  {
    slug: 'chicpets',
    name: 'ChicPets',
    tagline:
      'Landing page de um petshop e estética animal de Junqueirópolis, com foco em conversão pelo WhatsApp.',
    featured: false,
    status: { label: 'Concluído · cliente real', tone: 'shipped' },
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Actions'],
    repo: 'https://github.com/omurilomota/petshop-Chic',
    repoIsPublic: true,
    // Verificado em 13/10/2026: responde HTTP 200 pelo Cloudflare Workers.
    demo: 'https://petshop-chic.murilohenriquemota935.workers.dev',
    // Composta com a mesma captura em desktop (16:10, a proporção do cartão) e
    // em celular emoldurado — mostra a responsividade numa imagem só.
    screenshot: '/projetos/chicpets.webp',
    evidence: ['36 commits em 2 dias', 'integração contínua configurada', 'site de uma página só'],
    detail: {
      problem:
        'Um negócio local precisava de presença na internet que funcionasse no celular e levasse o cliente direto ao WhatsApp, sem depender de alguém editar código para trocar telefone, endereço ou horário.',
      solution:
        'Uma página única e responsiva com as seções de serviços, galeria, sobre, contato e localização. Todas as informações do negócio ficam centralizadas em um único arquivo de configuração, então trocar dados da loja não passa por nenhum componente.',
      features: [
        { text: 'Página única responsiva com imagens otimizadas', state: 'pronto' },
        { text: 'Conteúdo do negócio centralizado em um arquivo de configuração', state: 'pronto' },
        { text: 'Contato direto por WhatsApp, com barra fixa no celular', state: 'pronto' },
        { text: 'Integração contínua rodando a cada push', state: 'pronto' },
        { text: 'Painel para a loja editar o conteúdo sem mexer no código', state: 'planejado' },
      ],
      decisions: [
        {
          title: 'Um arquivo de configuração para tudo que é do negócio',
          body: 'Telefone, endereço, horários, serviços e fotos ficam em `src/config.ts`. Isso evita o problema clássico de site de cliente: a informação repetida em sete componentes, e a versão errada atualizada em apenas seis deles.',
        },
        {
          title: 'Verificações automáticas a cada push',
          body: 'O pipeline roda checagem de tipos e build antes de qualquer publicação. Como o site é de terceiro, um erro que só aparece em produção é pior do que um minuto esperando o pipeline terminar.',
        },
      ],
      next: [],
    },
  },
]

export const featuredProject = projects.find((project) => project.featured) ?? projects[0]

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug)
