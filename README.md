# Mobiliza

Plataforma colaborativa para identificação e priorização de problemas de mobilidade urbana a partir da participação da comunidade.

Este repositório contém o **protótipo de Nível 1** do projeto: uma interface funcional em HTML, CSS e JavaScript puro, sem back-end, usada para validar a proposta de valor, o fluxo de uso e a interação antes da construção do MVP real.

## Sobre o projeto

Moradores e estudantes podem registrar problemas de mobilidade observados em sua região — calçadas danificadas, falta de acessibilidade, cruzamentos perigosos, pontos de ônibus inadequados, entre outros. As ocorrências são exibidas em um mapa (representado, nesta primeira versão, por um croqui em CSS) e organizadas automaticamente por prioridade, calculada a partir da frequência de relatos e da gravidade percebida do problema.

O projeto está alinhado ao Objetivo de Desenvolvimento Sustentável 11 (Cidades e Comunidades Sustentáveis) e foi desenvolvido como atividade extensionista.

## Funcionalidades do protótipo

- Página inicial com estatísticas gerais dos problemas registrados
- Mapa/croqui interativo com marcadores coloridos por prioridade
- Registro de novos problemas por formulário (tipo, local, grau de dificuldade e descrição)
- Filtro de problemas por categoria
- Cálculo automático de prioridade (alta, média ou baixa)
- Painel administrativo com a lista de problemas ordenada por prioridade

Os dados são mantidos em memória e persistidos no `localStorage` do navegador apenas para simular continuidade entre as páginas — não há banco de dados nesta etapa.

## Estrutura do repositório

```text
mobiliza/
├── index.html    # página principal (mapa, registro, estatísticas)
├── admin.html    # painel administrativo
├── style.css     # identidade visual e layout
├── script.js     # dados simulados, cálculo de prioridade e renderização
└── README.md
```

## Como executar

Não há dependências nem processo de build. Basta abrir o arquivo `index.html` em um navegador, ou servir a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
```

## Roteiro de evolução

| Nível | Descrição |
|---|---|
| 1 — Protótipo (este repositório) | Interface, croqui de mapa, cadastro, filtros e dados simulados |
| 2 — MVP | Persistência real (banco de dados), possivelmente com ferramentas low-code/no-code |
| 3 — Produto | Geolocalização, fotos, autenticação, dashboard e integração com órgãos públicos |

## Equipe

- Pablo Eduardo da Silva Armando
- Raquel Helena Caetano Pinheiro

## Licença

Projeto acadêmico, sem fins comerciais.
