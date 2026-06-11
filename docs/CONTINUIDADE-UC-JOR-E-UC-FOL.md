# Sistema de RH para o Mercado Brasileiro

# Continuidade da Especificação Funcional

## Escopo deste documento

Este documento consolida:

- a revisão crítica do módulo **UC-JOR — Jornada e Controle de Ponto**;
- as funcionalidades corporativas que ainda faltam no pacote UC-JOR;
- a sugestão de novos casos de uso para completar o módulo;
- o início do módulo **UC-FOL — Folha de Pagamento**, começando por **UC-FOL-001 — Cadastrar Rubrica**.

---

# 1. Revisão crítica do UC-JOR

## 1.1 Cobertura atual observada

O pacote UC-JOR já cobre os seguintes fluxos:

- UC-JOR-001 — Cadastrar Jornada de Trabalho;
- UC-JOR-002 — Cadastrar Escala de Trabalho;
- UC-JOR-003 — Registrar Marcação de Ponto;
- UC-JOR-004 — Importar Marcações de Ponto;
- UC-JOR-005 — Tratar Inconsistências de Ponto;
- UC-JOR-006 — Solicitar Ajuste de Ponto;
- UC-JOR-007 — Aprovar Ajuste de Ponto;
- UC-JOR-008 — Calcular Horas Extras;
- UC-JOR-009 — Calcular Banco de Horas;
- UC-JOR-010 — Gerar Espelho de Ponto.

Em termos funcionais, isso cobre o núcleo operacional do módulo:

- cadastro de jornada;
- cadastro de escala;
- registro e importação de marcações;
- tratamento de inconsistências;
- workflow de ajuste de ponto;
- cálculo de horas extras;
- banco de horas;
- espelho de ponto.

## 1.2 Pontos fortes do pacote

O pacote UC-JOR já apresenta uma boa base para operação corporativa porque:

- separa o cadastro da jornada do cadastro da escala;
- preserva marcação original e gera ajustes complementares;
- inclui workflow de aprovação para ajustes;
- trata reprocessamento e recalculo;
- prevê integração com folha, portal do colaborador, portal do gestor e auditoria;
- inclui espelho de ponto como documento consolidado e versionado;
- considera feriados, geolocalização, dispositivo e rastreabilidade na base de regras do domínio.

## 1.3 Lacunas funcionais identificadas

Apesar da boa cobertura, o módulo ainda está incompleto para um cenário enterprise de RH brasileiro.

### Lacunas de fechamento operacional

Faltam casos de uso explícitos para:

- fechamento formal do período de ponto;
- reabertura formal do período de ponto;
- bloqueio de alterações após fechamento;
- bloqueio ou tratamento especial de ajustes fora do prazo;
- reprocessamento controlado após correção;
- conciliação entre ponto, banco de horas e folha.

Esses pontos aparecem nas regras, mas não estão materializados como casos de uso próprios.

### Lacunas de regras de cálculo

Faltam casos de uso explícitos para:

- cálculo de adicional noturno;
- tratamento de DSR quando aplicável;
- tratamento de feriados e domingos como regra operacional específica;
- parametrização de tolerâncias e exceções por empresa, acordo ou perfil;
- cálculo de abonos, faltas justificadas e saídas abonadas;
- consolidação de eventos de ponto para folha.

Esses tópicos são relevantes porque o domínio de ponto não termina no registro da marcação; ele impacta pagamento, descontos, banco de horas e auditoria.

### Lacunas de rastreabilidade e prova

Faltam casos de uso explícitos para:

- emissão de comprovante de marcação;
- consulta de comprovante e histórico da marcação original;
- gestão de geolocalização da marcação como evidência;
- gestão do dispositivo utilizado;
- trilha de auditoria detalhada por operação e por período;
- exportação controlada para auditoria, jurídico e fiscal.

### Lacunas de governança operacional

Faltam casos de uso explícitos para:

- parametrização de regras de ponto por empresa;
- configuração de calendários de feriados e exceções locais;
- configuração de tolerâncias operacionais;
- configuração de perfis de aprovação por alçada;
- monitoramento de pendências e filas de inconsistências;
- relatórios operacionais do módulo.

### Lacunas de integração

O pacote atual menciona integrações, mas não detalha os fluxos operacionais de:

- envio de valores para folha;
- envio de valores tratados para banco de horas;
- envio de eventos para workflow;
- retenção de evidências e documentos em gestão documental;
- consumo de dados por portal do colaborador e portal do gestor;
- exportação para analytics e BI.

## 1.4 Pontos de atenção de arquitetura e compliance

### Arquitetura

- O espelho de ponto deve ser tratado como documento consolidado, versionado e potencialmente imutável após assinatura.
- Marcações originais não podem ser sobrescritas.
- Ajustes precisam sempre ser complementares e auditáveis.
- O cálculo precisa ser reprodutível e recalculável.
- O fechamento do período deve congelar a base lógica do cálculo.

### LGPD

- Geolocalização, imagem, dispositivo e outros metadados podem ser dados pessoais ou sensíveis em certos contextos operacionais.
- O sistema não deve expor evidências sem controle de acesso e trilha de auditoria.
- Exportações devem ser limitadas por finalidade, perfil e necessidade.

### Legislação trabalhista

- As regras de ponto precisam respeitar os parâmetros legais aplicáveis, acordos coletivos e políticas internas.
- Tratamentos de feriados, adicional noturno, DSR e banco de horas podem variar por empresa, categoria e acordo.
- Este documento não presume conformidade legal automática; cada regra depende de validação especializada quando houver impacto jurídico ou contábil.

### eSocial / Folha / SST

- O módulo de ponto alimenta folha, eSocial e, indiretamente, rotinas de SST e compliance.
- O pacote deve explicitar quando um cálculo é apenas operacional e quando já gera impacto em evento ou integração.
- Reprocessamentos devem registrar impacto sobre folha, banco e eventos correlatos.

## 1.5 Complementos necessários aos casos existentes

### UC-JOR-001 — Cadastrar Jornada de Trabalho

Complementar com:

- regra explícita de jornada por vigência e por tipo de vínculo;
- tratamento de jornada 12x36, 5x2, 6x1 e escalas personalizadas;
- bloqueio de alterações retroativas;
- vínculo com calendário de feriados e exceções;
- distinção entre jornada padrão, jornada excepcional e jornada contratual;
- indicação de necessidade de integração com folha e banco de horas.

### UC-JOR-002 — Cadastrar Escala de Trabalho

Complementar com:

- tipos de escala;
- calendário de vigência;
- troca de escala com aprovação;
- associação entre escala, jornada e equipe;
- regras para turnos noturnos, jornadas alternadas e escalas rotativas;
- impacto em adicional noturno, feriados e banco de horas.

### UC-JOR-003 — Registrar Marcação de Ponto

Complementar com:

- origem da marcação;
- geolocalização quando aplicável;
- identificação do dispositivo;
- comprovante da marcação;
- tratamento de marcação offline;
- prevenção de duplicidade;
- trilha de auditoria da marcação original.

### UC-JOR-004 — Importar Marcações de Ponto

Complementar com:

- controle de lote de importação;
- validação de duplicidades;
- relatório de erros por lote;
- rastreabilidade da origem do arquivo;
- tratamento de marcações fora do padrão;
- reprocessamento de lote com preservação de histórico.

### UC-JOR-005 — Tratar Inconsistências de Ponto

Complementar com:

- regras de inconsistência por tipo;
- tratamento por período aberto e fechado;
- fila de pendências por gestor e RH;
- justificativa obrigatória;
- impacto em espelho de ponto;
- impacto em folha e banco de horas.

### UC-JOR-006 — Solicitar Ajuste de Ponto

Complementar com:

- prazo para solicitação;
- anexos obrigatórios ou opcionais por tipo;
- política documental para evidências;
- duplicidade de solicitações;
- escalonamento para workflow;
- notificação ao gestor e ao RH.

### UC-JOR-007 — Aprovar Ajuste de Ponto

Complementar com:

- alçada de aprovação;
- justificativa obrigatória para rejeição;
- solicitação de complementação;
- reabertura controlada em caso de período fechado;
- registro de decisão e auditoria da decisão;
- integração com recalculo do período.

### UC-JOR-008 — Calcular Horas Extras

Complementar com:

- adicionais por feriado e domingo;
- regras por percentual;
- tolerâncias configuráveis;
- tratamento de jornadas especiais;
- memória de cálculo;
- integração com folha apenas quando aprovado.

### UC-JOR-009 — Calcular Banco de Horas

Complementar com:

- política de expiração;
- saldo positivo e negativo;
- compensações aprovadas;
- vínculo com acordo coletivo ou política interna;
- saldo por período e por competência;
- integração com folha quando houver pagamento ou desconto.

### UC-JOR-010 — Gerar Espelho de Ponto

Complementar com:

- status do espelho por período;
- assinatura ou ciência do colaborador;
- reabertura formal quando houver contestação;
- versão preliminar e versão final;
- arquivamento do documento;
- integração com gestão documental e auditoria.

## 1.6 Novos casos de uso sugeridos para completar UC-JOR

O pacote está funcionalmente forte, mas ainda incompleto para um módulo enterprise.

Os complementos formais de UC-JOR foram detalhados depois desta revisão:

- UC-JOR-011 — Fechar Período de Ponto;
- UC-JOR-012 — Reabrir Período de Ponto;
- UC-JOR-013 — Configurar Calendário de Feriados e Exceções;
- UC-JOR-014 — Configurar Regras de Tolerância de Ponto;
- UC-JOR-015 — Registrar e Gerenciar Dispositivos de Ponto;
- UC-JOR-016 — Emitir Comprovante de Marcação;
- UC-JOR-017 — Calcular Adicional Noturno;
- UC-JOR-018 — Aplicar Regras de DSR e Descanso Semanal;
- UC-JOR-019 — Consolidar Eventos de Ponto para Folha;
- UC-JOR-020 — Exportar Espelho e Trilhas de Auditoria.

### Detalhamento já iniciado

- UC-JOR-013 — Configurar Calendário de Feriados e Exceções
- UC-JOR-014 — Configurar Regras de Tolerância de Ponto
- UC-JOR-015 — Registrar e Gerenciar Dispositivos de Ponto
- UC-JOR-016 — Emitir Comprovante de Marcação
- UC-JOR-017 — Calcular Adicional Noturno
- UC-JOR-018 — Aplicar Regras de DSR e Descanso Semanal
- UC-JOR-019 — Consolidar Eventos de Ponto para Folha
- UC-JOR-020 — Exportar Espelho e Trilhas de Auditoria

### Casos de uso sugeridos

## 1.7 Conclusão da revisão do UC-JOR

O UC-JOR está bem encaminhado como núcleo de ponto, mas ainda precisa de:

- casos formais de fechamento e reabertura;
- detalhamento de adicional noturno, DSR, feriados e exceções;
- rastreabilidade operacional mais explícita;
- integração formal com folha e governança;
- cobertura mais robusta de evidências e dispositivos.

Esta conclusão foi superada pela expansão posterior dos casos UC-JOR-011 a UC-JOR-020, que agora cobrem fechamento, reabertura, calendários, tolerâncias, dispositivos, comprovantes, adicional noturno, DSR, consolidação para folha e trilhas de auditoria.

---

# 2. Início do UC-FOL

# UC-FOL — Folha de Pagamento

## UC-FOL-001 — Cadastrar Rubrica

### Versão

1.0

---

## Objetivo

Permitir o cadastro e a manutenção de rubricas de folha de pagamento, assegurando identificação única, descrição, natureza, vigência, histórico e preparação para parametrização de incidências e integração com eSocial, folha, fechamento e auditoria.

---

## Atores

### Primários

- Analista de RH
- Analista de Folha
- Administrador do Sistema

### Secundários

- eSocial
- Folha de Pagamento
- Auditoria
- Workflow e Aprovações

---

## Pré-condições

- Empresa cadastrada.
- Usuário autenticado.
- Usuário com permissão para administrar rubricas.
- Configuração básica da empresa para folha disponível.
- Estrutura mínima do eSocial para a empresa conhecida ou em preparação.
- Não existir outra rubrica ativa com o mesmo código interno na mesma empresa.

---

## Gatilho

O processo inicia quando o RH ou a área de folha precisa criar uma nova rubrica para uso em cálculo, parametrização, conferência, integração ou fechamento da folha.

---

## Fluxo Principal

### Etapa 1

Usuário acessa:

```text
Folha de Pagamento
→ Rubricas
→ Nova Rubrica
```

### Etapa 2

Sistema apresenta formulário de cadastro da rubrica.

### Etapa 3

Usuário informa os dados básicos da rubrica:

- código interno;
- descrição;
- natureza da rubrica;
- categoria funcional ou contábil, quando aplicável;
- vigência inicial;
- vigência final, quando aplicável;
- status inicial.

### Etapa 4

Usuário informa o enquadramento operacional da rubrica:

- se a rubrica é fixa, variável ou informativa;
- se a rubrica compõe cálculo de folha ou apenas referência;
- se a rubrica depende de regra especial;
- se a rubrica depende de autorização ou aprovação.

### Etapa 5

Usuário confirma o cadastro.

### Etapa 6

Sistema valida:

- unicidade do código;
- presença dos campos obrigatórios;
- consistência da natureza informada;
- consistência da vigência;
- compatibilidade mínima com o modelo de folha da empresa.

### Etapa 7

Sistema grava a rubrica.

### Etapa 8

Sistema registra histórico inicial da criação.

### Etapa 9

Sistema disponibiliza a rubrica para o caso de uso de configuração de incidências.

### Etapa 10

Sistema registra trilha de auditoria da criação.

---

## Fluxos Alternativos

### FA-01 — Código interno já existente

#### Condição

Já existe outra rubrica com o mesmo código interno na mesma empresa.

#### Ação

Sistema bloqueia a gravação.

#### Resultado

Rubrica não cadastrada.

---

### FA-02 — Campo obrigatório ausente

#### Condição

Um ou mais campos obrigatórios não foram preenchidos.

#### Ação

Sistema exibe as inconsistências.

#### Resultado

Usuário precisa corrigir os dados antes de salvar.

---

### FA-03 — Vigência inconsistente

#### Condição

A vigência informada é inválida ou conflita com regras internas da empresa.

#### Ação

Sistema bloqueia a gravação ou solicita ajuste.

#### Resultado

Rubrica não cadastrada.

---

### FA-04 — Usuário sem permissão

#### Condição

Usuário não possui permissão para cadastrar rubricas.

#### Ação

Sistema bloqueia o acesso.

#### Resultado

Operação não realizada.

---

## Pós-condições

### Sucesso

- Rubrica criada.
- Histórico inicial registrado.
- Rubrica disponível para parametrização de incidências.
- Rubrica disponível para uso em módulos dependentes após parametrização completa.

### Falha

- Nenhuma alteração persistida.

---

## Regras de Negócio Relacionadas

- Toda rubrica deve possuir código interno único na empresa.
- Toda rubrica deve possuir descrição.
- Toda rubrica deve possuir natureza definida.
- Alterações em rubricas devem manter histórico.
- Rubricas utilizadas em folha fechada não podem ser excluídas.
- Rubricas com efeito tributário ou previdenciário devem ser compatíveis com o eSocial.
- A rubrica cadastrada neste caso de uso pode ficar em estado de parametrização pendente até a configuração das incidências.
- O cadastro da rubrica não deve sobrescrever histórico anterior.

---

## Entidades Envolvidas

### PayrollRubric

```text
id
company_id
internal_code
description
nature
classification
status
valid_from
valid_to
created_at
created_by
updated_at
updated_by
```

### PayrollRubricHistory

```text
id
payroll_rubric_id
change_type
changed_by
changed_at
snapshot
```

---

## Campos Obrigatórios

| Campo | Obrigatório |
|---|---|
| Código interno | Sim |
| Descrição | Sim |
| Natureza | Sim |
| Vigência inicial | Sim |
| Status inicial | Sim |

---

## Permissões

| Perfil | Permissão |
|---|---|
| RH Admin | Total |
| RH Folha | Criar e editar |
| Gestor | Não |
| Colaborador | Não |
| Auditor | Consulta |

---

## APIs Sugeridas

```http
POST /api/v1/payroll-rubrics
```

```http
GET /api/v1/payroll-rubrics/{id}
```

```http
PUT /api/v1/payroll-rubrics/{id}
```

```http
PATCH /api/v1/payroll-rubrics/{id}/inactivate
```

---

## Eventos de Domínio

```text
PayrollRubricCreated
PayrollRubricUpdated
PayrollRubricInactivated
PayrollRubricReactivated
```

---

## Integrações Impactadas

- Folha de Pagamento
- Configuração de incidências da rubrica
- eSocial S-1010
- Fechamento da folha
- Auditoria
- Analytics e BI

---

## Casos de Teste

### CT-FOL-001-001

Cadastrar rubrica válida.

Resultado esperado:

```text
Rubrica criada com sucesso.
```

### CT-FOL-001-002

Cadastrar rubrica com código duplicado.

Resultado esperado:

```text
Sistema bloqueia a gravação.
```

### CT-FOL-001-003

Cadastrar rubrica sem descrição.

Resultado esperado:

```text
Validação obrigatória exibida.
```

### CT-FOL-001-004

Cadastrar rubrica com vigência inconsistente.

Resultado esperado:

```text
Sistema bloqueia a gravação e informa a inconsistência.
```

---

## Métricas

- Quantidade de rubricas ativas.
- Quantidade de rubricas por empresa.
- Quantidade de alterações de rubrica por competência.
- Quantidade de rubricas pendentes de parametrização.

---

## Observações Arquiteturais

O cadastro de rubrica deve ser tratado como entidade versionada e auditável desde a criação.

A parametrização de incidências, bases e classificações fiscais deve permanecer separada em caso de uso próprio para evitar mistura entre cadastro estrutural e regra tributária.

A rubrica cadastrada aqui não deve ser considerada apta para cálculo, fechamento ou transmissão ao eSocial até que as incidências e classificações necessárias estejam concluídas.

---

## Lacunas adjacentes ao UC-FOL-001

O cadastro de rubrica depende de definições posteriores, que devem permanecer em casos de uso próprios:

- UC-FOL-002 — Configurar Incidências da Rubrica;
- UC-FOL-003 — Processar Folha Mensal;
- UC-FOL-004 — Processar Folha Complementar;
- UC-FOL-005 — Processar Adiantamento Salarial;
- UC-FOL-006 — Calcular INSS;
- UC-FOL-007 — Calcular FGTS;
- UC-FOL-008 — Calcular IRRF;
- UC-FOL-009 — Gerar Holerite;
- UC-FOL-010 — Fechar Folha de Pagamento.

---

# 3. Lacunas de arquitetura, legislação, eSocial, LGPD, SST e integrações

## 3.1 Arquitetura

- O módulo de ponto depende de fechamento e reabertura formais para impedir alterações retroativas indevidas.
- O módulo de folha precisa versionar rubricas, cálculos e competências.
- A integração entre ponto e folha precisa ser explicitada como contrato funcional, e não apenas como menção genérica.

## 3.2 Legislação trabalhista

- Adicional noturno, feriados, DSR, banco de horas e fechamento de período não podem ser tratados como regras meramente visuais.
- O comportamento esperado pode variar por empresa, acordo coletivo e parametrização corporativa.
- Qualquer regra com impacto jurídico ou contábil deve ser validada com especialista responsável.

## 3.3 eSocial

- A rubrica precisa nascer com visão de compatibilidade com S-1010.
- O ponto precisa gerar base confiável para eventos trabalhistas e periódicos, direta ou indiretamente.
- Divergências entre cálculo interno e retorno governamental devem gerar pendência auditável.

## 3.4 LGPD

- Geolocalização, dispositivo, imagens, documentos anexos e justificativas podem ser dados sensíveis ou de alto risco operacional.
- Exportações precisam de controle de acesso e rastreabilidade.
- Logs e auditorias não devem vazar dados pessoais desnecessários.

## 3.5 SST

- O módulo de ponto pode alimentar rotinas de SST quando faltas, afastamentos, jornadas especiais ou eventos de saúde ocupacional forem correlatos.
- O pacote atual não trata isso como fluxo formal, então a dependência deve ficar explícita quando houver integração.

## 3.6 Integrações

- Ponto para folha.
- Ponto para banco de horas.
- Ponto para workflow.
- Folha para eSocial.
- Folha para gestão documental.
- Ponto e folha para analytics e BI.

---

# 4. Próximos passos recomendados

1. Sequência catalogada concluída para UC-JOR, UC-FOL, UC-BI, UC-SEC, UC-API e UC-PLT.
2. Partir para revisão transversal, consolidação de contratos funcionais e eventual congelamento da especificação.
3. Vincular os fluxos de ponto, folha, BI, segurança, APIs e plataforma à trilha de auditoria e ao eSocial.
4. Validar o pacote completo com uma revisão jurídica, contábil e operacional antes de iniciar implementação.
