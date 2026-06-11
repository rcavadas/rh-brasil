# Sistema de RH para o Mercado Brasileiro

# Topico 04 - Plano de Implementacao de Admissao e Desligamento

## Objetivo

Transformar a especificacao de admissao digital, eSocial e desligamento administrativo em backlog executavel, com uma ordem minima de entrega que preserve rastreabilidade, reduza risco de mistura entre cadastro e contrato e prepare o dominio para o primeiro ciclo de implementacao real.

---

# Estado Atual

O runtime executavel atual ainda nao implementa o fluxo completo de admissao digital nem o desligamento administrativo completo, mas ja possui a trilha minima de eSocial da admissao com fila, worker e persistencia de transmissao, a trilha minima de desligamento administrativo com aprovacao, efetivacao e bloqueio de apontamentos, o offboarding minimo e o eSocial de desligamento minimo.

O que existe hoje no slice executavel e:

- tenant;
- company;
- person;
- `Employee` como projecao operacional de `VinculoTrabalhista`;
- point mark;
- resumo;
- audit event;
- acesso multi-tenant.

Dentro do Topico 04, a estrutura de admissao, o checklist documental minimo, a formalizacao contratual separada, a trilha minima de eSocial, o desligamento administrativo minimo, o offboarding minimo e o eSocial de desligamento minimo ja entraram no runtime; a rescisao minima tambem ja entrou.

---

# Premissas

- `UC-ADM-001` continua como cadastro-base do colaborador.
- `UC-ADM-005` continua como formalizacao do vinculo.
- `UC-ADM-010` continua como desligamento administrativo.
- `TOPICO-04` define o comportamento desejado, mas nao o runtime atual.
- `Employee` permanece como a projecao operacional do vinculo no MVP.

---

# Ordem Minima De Implementacao

## 1. Estrutura de admissao

Primeira fatia executavel:

- criar uma entidade de solicitacao de admissao;
- persistir estado inicial da admissao;
- vincular pessoa, empresa e `Employee`;
- registrar auditoria de criacao e transicao de estado;
- manter o cadastro-base separado da transmissao legal.

### Resultado esperado

- existe uma admissao rastreavel por tenant;
- a admissao pode estar em rascunho, em validacao, pendente ou concluida;
- o contrato nao e confundido com o cadastro-base.

## 2. Checklist documental

Segunda fatia executavel:

- parametrizar documentos obrigatorios por empresa e tipo de contrato;
- registrar documentos recebidos;
- bloquear conclusao sem requisitos minimos;
- preservar evidencias e historico.

### Resultado esperado

- o processo admite pendencias;
- a pendencia e visivel;
- a conclusao depende do checklist.

## 3. Formalizacao contratual

Terceira fatia executavel:

- persistir snapshot contratual separado da solicitacao;
- registrar vigencia e tipo de contrato;
- gerar historico de alteracoes contratuais;
- manter `Employee` como base operacional e nao como contrato final.

### Resultado esperado

- existe separacao clara entre cadastro-base e contrato;
- o vinculo formal pode ser evoluido sem quebrar o modelo atual.

## 4. Integracao eSocial

Quarta fatia executavel:

- criar fila/worker para transmissao assicrona;
- preparar payloads S-2190 e S-2200;
- registrar XML, retorno e recibo;
- manter status de pendencia e rejeicao;
- permitir reprocessamento.

### Estado atual

- a fila e o worker da admissao ja existem no runtime;
- as transmissoes ja sao persistidas com estado e evidencia de envio;
- o contrato governamental final, a conciliacao e o reprocessamento operacional continuam como evolucao posterior.

### Resultado esperado

- o envio legal deixa de ser implícito;
- a rejeicao nao encerra o processo;
- cada tentativa fica auditavel.

## 5. Desligamento administrativo

Quinta fatia executavel:

- criar solicitacao de desligamento;
- registrar motivo, data efetiva e fluxo de aprovacao;
- bloquear novos apontamentos quando o desligamento estiver efetivado;
- iniciar offboarding e integracoes dependentes;
- preparar trilha para rescisao.

### Estado atual

- a solicitacao, a aprovacao, a efetivacao e o bloqueio de apontamentos ja existem no runtime;
- o offboarding e a transmissao minima de desligamento tambem ja existem no runtime;
- as integracoes dependentes e os fluxos completos continuam como evolucao posterior.

### Resultado esperado

- o desligamento fica separado da rescisao;
- o offboarding e rastreavel;
- o ciclo de vida do colaborador fica coerente com admissao e ponto.

---

# Nao Objetivos Desta Fase

- nao tratar a trilha minima de eSocial como contrato governamental final;
- nao acoplar admissao e desligamento a folha;
- nao absorver rescisao completa no mesmo fluxo;
- nao renomear `Employee` no runtime atual;
- nao quebrar compatibilidade com o slice relacional ja validado.

---

# Dependencias

- autenticao/autorizacao ja existente;
- tenant access ja materializado;
- modelagem de `Employee` como projeao operacional do vinculo;
- storage de auditoria e persistencia relacional ja existentes;
- fila/worker para transmissao assicrona ja implementados no runtime;
- trilha minima de desligamento administrativo ja implementada no runtime;
- storage para documentos e anexos;
- validacao juridica e operacional do contrato governamental final do eSocial.

---

# Riscos

- confundir cadastro-base com contrato;
- expor fluxo legal como concluido sem retorno governamental;
- perder trilha de rejeicao e reprocessamento;
- sobrepor desligamento administrativo, rescisao e offboarding;
- migrar o modelo de vinculo sem plano de compatibilidade.

---

# Proximo Passo

O proximo passo tecnico sugerido e transformar a primeira fatia de admissao em tarefas executaveis no backlog, começando por:

1. solicitacao de admissao;
2. checklist documental minimo;
3. formalizacao contratual separada;
4. fila assicrona de transmissao legal;
5. rescisao detalhada, offboarding e eSocial de desligamento.

Observacao: a implementacao minima de desligamento administrativo ja existe, assim como offboarding e eSocial de desligamento minimos e um scaffold minimo de rescisao; o passo seguinte real e fechar os fluxos completos de desligamento.
