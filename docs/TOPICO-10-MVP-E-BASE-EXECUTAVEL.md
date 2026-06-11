# Sistema de RH para o Mercado Brasileiro

# Topico 10 - MVP e Base Executavel

## Objetivo

Fechar o recorte do MVP, ordenar a entrega e amarrar esse recorte a uma base executavel pequena, validavel e rastreavel.

---

## Contexto

A matriz tecnica, a stack recomendada e o vertical slice inicial ja existem como referencia de arquitetura e de entrega.

O MVP nao e o catalogo inteiro de RH. Ele precisa provar o nucleo do produto e reduzir risco antes de ampliar o dominio.

---

## Decisao consolidada

O MVP do produto fica definido em tres camadas:

### 1. Plataforma minima

- tenant e isolamento;
- autenticacao e autorizacao;
- auditoria funcional;
- banco relacional;
- fila e eventos basicos;
- storage de documentos;
- logs e observabilidade minima;
- backup e restore operacionais.

### 2. Nucleo do colaborador

- empresa;
- pessoa;
- colaborador;
- vinculo trabalhista;
- documentos essenciais;
- admissao digital simplificada;
- eventos minimos de eSocial.

### 3. Operacao essencial

- jornada e ponto;
- consolidacao de eventos;
- folha mensal minima;
- holerite ou demonstrativo basico;
- portal do colaborador basico;
- portal do gestor basico;
- exportacoes e auditoria do fluxo.

---

## Ordem de entrega

1. fundacao da plataforma;
2. modelo de dados central;
3. cadastro e vinculo do colaborador;
4. admissao digital e eSocial;
5. jornada, ponto e folha mensal;
6. portais basicos e auditoria;
7. expansao para beneficios, ferias, 13o, rescisao e outros dominios.

---

## Fora do MVP

Deixar para uma fase posterior, salvo necessidade de negocio muito clara:

- ATS completo;
- onboarding completo;
- LMS;
- avaliacao de desempenho;
- sucessao e carreira;
- reembolsos e despesas;
- BI avancado;
- integracoes externas complexas;
- motor completo de compliance;
- automacoes avancadas de workflow.

---

## Criterios de aceite

- o fluxo deve rodar do inicio ao fim em ambiente local;
- o tenant deve permanecer isolado;
- a auditoria deve registrar cada evento relevante;
- o historico nao deve ser corrompido por reprocessamento;
- o sistema deve permitir reexecucao controlada;
- os testes minimos de regressao devem existir para o slice escolhido;
- logs e observabilidade minima devem existir desde o primeiro release.

---

## Base executavel recomendada

### Estrutura minima

- frontend web;
- backend API;
- banco relacional;
- fila assíncrona;
- storage de documentos;
- autenticacao federada ou local;
- auditoria de negocio;
- pipeline de testes;
- ambiente de homologacao.

### Propriedades

- modularidade;
- simplicidade operacional;
- reprocessamento;
- rastreabilidade;
- escalabilidade incremental.

---

## Relacao com os topicos 11 e 12

- o Topico 11 define a stack e a arquitetura executavel;
- o Topico 12 define o primeiro vertical slice ponta a ponta;
- este Topico 10 define o recorte do MVP que orienta os dois.

---

## Riscos

- tentar construir todos os modulos antes de validar a espinha dorsal;
- começar por BI, portais ou integracoes sem ter dominio central;
- deixar auditoria e tenant para depois;
- misturar MVP com backlog completo;
- permitir implementacao sem contrato tecnico;
- criar base executavel sem testes minimos.

---

## Proximo passo

Com o MVP fechado, a ordem pratica segue para:

1. implementacao e decomposicao em épicos;
2. consolidacao do primeiro vertical slice;
3. expansao por ondas, nao por salto unico.
