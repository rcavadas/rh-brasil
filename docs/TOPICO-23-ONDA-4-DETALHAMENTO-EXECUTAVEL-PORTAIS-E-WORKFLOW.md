# Sistema de RH para o Mercado Brasileiro

# Topico 23 - Onda 4: Detalhamento Executavel de Portais e Workflow

## Objetivo

Transformar a Onda 4 do pos-MVP em frentes praticas de UX, portal e workflow, mantendo os fluxos auditaveis e coerentes com o contexto multi-tenant.

---

## Frentes executaveis

### 1. Portal do colaborador

- priorizar autosservico e documentos;
- expor apenas o necessario por perfil;
- manter estado do tenant ativo e do contexto do usuario;
- alinhar exibição com retencao e mascaramento.

### 2. Portal do gestor

- focar aprovacoes e visao de equipe;
- manter trilha de excecao;
- evitar exposicao de dados alem do papel;
- validar estados vazios e fluxos longos.

### 3. Workflow generico

- definir etapas, transicoes e excecoes;
- registrar aprovacoes e recusas;
- manter auditoria de cada transicao;
- separar politica de negocio de interface.

### 4. Gestao documental

- separar retenção, mascaramento e consulta;
- manter versionamento de documentos;
- registrar reemissao e acesso;
- expor somente o necessario por finalidade.

### 5. UX estrutural

- tratar formularios longos sem perda de contexto;
- padronizar tabelas e filtros;
- desenhar estados vazios, erro e carregamento;
- evitar layouts genericos sem hierarquia funcional.

---

## Sequencia recomendada

1. portal do colaborador;
2. portal do gestor;
3. workflow generico;
4. gestao documental;
5. UX estrutural.

---

## Dependencias

- Onda 4 formalizada no Topico 17;
- backlog pos-MVP consolidado no Topico 13;
- Onda 1, Onda 2 e Onda 3 formalizadas;
- politicas de auditoria, LGPD e contexto de tenant ja definidas.

---

## Criterios de aceite

- a experiencia precisa respeitar papel, contexto e finalidade;
- transicoes devem ser auditaveis;
- documentos precisam seguir mascaramento e retencao;
- a UX nao pode quebrar fluxo longo ou dependencia operacional.

---

## Resultado esperado

Ao final deste detalhamento, a Onda 4 deve estar pronta para evoluir os portais e os workflows sem abrir riscos de governanca.
