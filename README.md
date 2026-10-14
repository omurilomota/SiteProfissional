# Portfólio — Murilo Mota

Site de apresentação profissional: uma página com navegação por seções e uma página de
detalhe para cada projeto.

Sem banco de dados, sem autenticação e sem API. Todo o conteúdo fica em arquivos TypeScript
dentro de `src/data/`, então não existe nada para hospedar além do próprio frontend.

---

## Rodando localmente

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarregamento automático |
| `npm run build` | Checagem de tipos seguida do build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Análise estática com oxlint |

---

## Onde editar o conteúdo

Tudo que aparece no site vem de dois arquivos. Não é preciso mexer em componentes para
atualizar o conteúdo.

### `src/data/profile.ts`

Identidade, apresentação, formação, disponibilidade, tecnologias e trajetória.

### `src/data/projects.ts`

Os projetos: dados do cartão e o conteúdo completo da página de detalhe.

### Capturas de tela

Salve a imagem em `public/projetos/` e aponte o caminho no campo `screenshot` do projeto
(`/projetos/nome-do-arquivo.webp`). Enquanto o campo estiver vazio, o cartão é renderizado
sem imagem, em vez de mostrar um espaço reservado quebrado.

Use a mesma proporção (16:10) e o mesmo tema claro ou escuro em todas as capturas. Misturar
tema claro e escuro é o que mais faz um portfólio parecer descuidado.

---

## Regra de honestidade dos dados

Estas regras existem para que nada entre no ar sem ser verdade. Elas estão descritas em
comentário no topo de `src/data/projects.ts`.

- **`features`** marca cada funcionalidade como `'pronto'` ou `'planejado'`. A página de
  detalhe renderiza as duas listas separadamente. Nunca marque como pronto o que ainda não
  está no repositório.
- **`evidence`** só aceita números verificáveis (commits, linhas, endpoints, arquivos de
  teste). Nada de "vários" ou "muitos".
- **`repoIsPublic`** controla se o link do repositório aparece no cartão. Com `false`, o
  cartão mostra "repositório disponível sob solicitação" em vez de um link que dá 404.
- **Campos `null`** em `profile.ts` fazem a seção correspondente desaparecer do site. É por
  isso que não existe texto do tipo `[preencher]` em lugar nenhum.
- Rodando `npm run dev`, o console lista tudo que ainda falta preencher.

### Pendências atuais

Rode `npm run dev` e olhe o console. Ao escrever esta versão faltavam:

- `education.completion` — previsão de conclusão do curso
- `availability.*` — turno, carga horária e modalidade
- `links.linkedin` — URL do perfil
- `links.resume` — PDF do currículo em `public/`
- captura de tela dos quatro projetos

---

## Publicando

O site é estático. Qualquer serviço que sirva arquivos estáticos funciona.

### Vercel (recomendado)

**No ar em <https://murilomota.vercel.app>**, no projeto `murilomota` da conta.

1. Importe o repositório em vercel.com.
2. O framework é detectado automaticamente como Vite.
3. O arquivo `vercel.json` já traz o rewrite que faz as rotas de `/projetos/...` funcionarem
   ao serem abertas direto no navegador.

Sem esse rewrite, abrir `https://seu-site/projetos/sorveteria-api` diretamente retornaria
404: quem resolve a rota é o React, não o servidor.

### Netlify

Crie `public/_redirects` com uma linha:

```
/*  /index.html  200
```

---

## Estrutura

```
src/
  components/     Seções e componentes reutilizáveis
  data/           Todo o conteúdo do site (perfil e projetos)
  pages/          Home, detalhe de projeto e página 404
  index.css       Tokens de design, reset e primitivos compartilhados
  App.css         Estilos das seções, páginas e comportamento responsivo
```

## Decisões de design

- **Sem biblioteca de UI.** Para uma página única, CSS com variáveis resolve e evita
  dependência cujo custo não se paga.
- **Sem backend.** Não há dado dinâmico, então não há motivo para manter um servidor.
- **Fonte Inter via Google Fonts**, com pilha de fontes do sistema como alternativa. Se
  quiser eliminar a requisição externa, instale `@fontsource/inter` e importe no `main.tsx`.
- **Contraste e foco visível** em todos os elementos interativos, navegação por teclado,
  link "pular para o conteúdo" e respeito a `prefers-reduced-motion`.
