# Sistema de RH para o Mercado Brasileiro

# Topico 01 - Fundacao da Plataforma

## Objetivo

Definir a base tecnica e operacional sobre a qual o sistema de RH sera construido, incluindo stack, estilo arquitetural, ambientes, persistencia, autenticao, autorizacao, auditoria e observabilidade.

---

# Contexto

O repositorio atual e predominantemente documental. Nao existe ainda base executavel confirmada, nem manifests de stack, nem evidencias de runtime real.

Antes de aprofundar qualquer modulo funcional, a plataforma precisa ter:

- uma stack escolhida e consistente;
- um modelo de execucao repetivel;
- isolamento multi-tenant;
- seguranca base;
- trilha de auditoria;
- padrao de integracao;
- estrategia de observabilidade e operacao.

---

# Recomendacao Tecnica

## 1. Estilo arquitetural

Recomenda-se iniciar com um **monolito modular** com fronteiras internas claras, em vez de distribuir o dominio cedo demais.

Motivos:

- reduz complexidade inicial;
- facilita coerencia de dominio;
- simplifica deploy, testes e operacao;
- permite evoluir para servicos separados quando houver pressao real de escala ou independencia.

## 2. Camadas principais

- API/backend central para regras de negocio.
- Frontend web para operacao de RH, gestor e colaborador.
- Banco relacional como fonte principal de verdade.
- Camada de eventos para integracoes e processos assicronos.
- Storage de documentos para arquivos, anexos e evidencias.
- Camada de auditoria separada e imutavel.

## 3. Stack recomendada para validar o produto

A stack exata ainda precisa ser confirmada, mas a combinacao tecnica sugerida para o MVP e:

- backend em uma stack com bom suporte a APIs, testes e tipagem forte;
- frontend web moderno com foco em portais e formularios;
- banco relacional transacional;
- cache e fila para processos assicronos;
- storage de objetos para documentos;
- autenticao OIDC/OAuth2 com suporte a MFA e SSO;
- observabilidade com logs estruturados, metrica e tracing.

Se o projeto quiser reduzir risco de implantacao, a decisao deve priorizar:

- produtividade da equipe;
- simplicidade operacional;
- consistencia entre backend, banco e integracoes;
- boa cobertura de testes.

---

# Decisoes Estruturais Necessarias

## 1. Multi-tenant

Definir desde o inicio se o isolamento sera:

- por schema;
- por banco;
- por linha com tenant_id;
- ou híbrido.

Sugestao:

- começar com isolamento logico forte por tenant_id e regras de acesso;
- manter a possibilidade de evolucao para isolamento fisico por cliente grande, se necessario.

## 2. Autenticacao e autorizacao

Definir:

- login local e federado;
- MFA;
- SSO;
- RBAC ou ABAC;
- escopos por empresa, filial, gestor e colaborador.

Sugestao:

- usar autenticao federada via OIDC/OAuth2;
- manter RBAC como base e complementar com regras de escopo por tenant e hierarquia.

## 3. Auditoria

Definir uma trilha obrigatoria para:

- cadastro;
- edicao;
- aprovacao;
- exclusao autorizada;
- transmissao externa;
- exportacao;
- acesso a dados sensiveis.

Sugestao:

- gravar auditoria como eventos append-only;
- separar log tecnico de log funcional;
- mascarar dados sensiveis nos logs.

## 4. Persistencia

Definir um banco relacional como fonte de verdade para:

- pessoas;
- vinculos;
- estrutura organizacional;
- eventos de negocio;
- competencia;
- workflow;
- integracoes;
- auditoria funcional.

Sugestao:

- usar historico por vigencia e eventos para qualquer dado sensivel ou regulatorio;
- evitar sobrescrita destrutiva.

## 5. Processamento assicrono

Definir desde cedo:

- filas;
- jobs;
- reprocessamento;
- idempotencia;
- DLQ;
- conciliacao.

Sugestao:

- qualquer transmissao externa ou calculo pesado deve sair do request principal.

---

# Ambientes

## Desenvolvimento

- ambiente local com dados de teste;
- seed de dominio;
- logs limpos sem dados pessoais reais.

## Homologacao

- espelho do comportamento de producao;
- integracoes sandbox;
- validacao de fluxos finais.

## Producao

- segregacao forte de tenants;
- backup;
- restore testado;
- auditoria ativa;
- monitoramento e alerta.

---

# Componentes Minimos

## Backend

- APIs REST;
- validacao de dominio;
- autenticacao;
- autorizacao;
- integracoes;
- eventos;
- auditoria;
- calculos.

## Frontend

- portal do colaborador;
- portal do gestor;
- backoffice de RH;
- telas responsivas;
- formulários com validação clara.

## Banco de dados

- entidades de dominio;
- vigencias;
- historico;
- trilha de alteracoes;
- controle por tenant.

## Infraestrutura

- pipeline de deploy;
- conteinerizacao;
- storage;
- filas;
- observabilidade;
- backup.

---

# Riscos

- escolher stack complexa demais e atrasar a entrega;
- decidir multi-tenant tarde demais e retrabalhar todo o modelo;
- misturar log tecnico com auditoria funcional;
- permitir sobrescrita de historico;
- acoplar integracoes externas ao fluxo principal;
- não prever segregacao de dados sensiveis.

---

# Proximo Passo

Depois da fundacao da plataforma, a ordem tecnica deve seguir para:

1. modelo de dados central;
2. cadastro e vinculo do colaborador;
3. admissao digital e eSocial.
