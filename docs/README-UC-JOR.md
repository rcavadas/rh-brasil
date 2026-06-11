# Sistema de RH para o Mercado Brasileiro

# Pacote UC-JOR — Jornada e Controle de Ponto

## Versão

1.0

## Objetivo

Este pacote contém os casos de uso detalhados do módulo **UC-JOR — Jornada e Controle de Ponto**, cobrindo cadastro de jornada, escalas, marcações, importação, tratamento, ajustes, horas extras, banco de horas, espelho de ponto, fechamento e reabertura de período.

---

# Arquivos

| Caso de Uso | Arquivo |
|---|---|
| UC-JOR-001 — Cadastrar Jornada de Trabalho | UC-JOR-001-cadastrar-jornada-de-trabalho.md |
| UC-JOR-002 — Cadastrar Escala de Trabalho | UC-JOR-002-cadastrar-escala-de-trabalho.md |
| UC-JOR-003 — Registrar Marcação de Ponto | UC-JOR-003-registrar-marcacao-de-ponto.md |
| UC-JOR-004 — Importar Marcações de Ponto | UC-JOR-004-importar-marcacoes-de-ponto.md |
| UC-JOR-005 — Tratar Inconsistências de Ponto | UC-JOR-005-tratar-inconsistencias-de-ponto.md |
| UC-JOR-006 — Solicitar Ajuste de Ponto | UC-JOR-006-solicitar-ajuste-de-ponto.md |
| UC-JOR-007 — Aprovar Ajuste de Ponto | UC-JOR-007-aprovar-ajuste-de-ponto.md |
| UC-JOR-008 — Calcular Horas Extras | UC-JOR-008-calcular-horas-extras.md |
| UC-JOR-009 — Calcular Banco de Horas | UC-JOR-009-calcular-banco-de-horas.md |
| UC-JOR-010 — Gerar Espelho de Ponto | UC-JOR-010-gerar-espelho-de-ponto.md |
| UC-JOR-011 — Fechar Período de Ponto | UC-JOR-011-fechar-periodo-de-ponto.md |
| UC-JOR-012 — Reabrir Período de Ponto | UC-JOR-012-reabrir-periodo-de-ponto.md |
| UC-JOR-013 — Configurar Calendário de Feriados e Exceções | UC-JOR-013-configurar-calendario-de-feriados-e-excecoes.md |
| UC-JOR-014 — Configurar Regras de Tolerância de Ponto | UC-JOR-014-configurar-regras-de-tolerancia-de-ponto.md |
| UC-JOR-015 — Registrar e Gerenciar Dispositivos de Ponto | UC-JOR-015-registrar-e-gerenciar-dispositivos-de-ponto.md |
| UC-JOR-016 — Emitir Comprovante de Marcação | UC-JOR-016-emitir-comprovante-de-marcacao.md |
| UC-JOR-017 — Calcular Adicional Noturno | UC-JOR-017-calcular-adicional-noturno.md |
| UC-JOR-018 — Aplicar Regras de DSR e Descanso Semanal | UC-JOR-018-aplicar-regras-de-dsr-e-descanso-semanal.md |
| UC-JOR-019 — Consolidar Eventos de Ponto para Folha | UC-JOR-019-consolidar-eventos-de-ponto-para-folha.md |
| UC-JOR-020 — Exportar Espelho e Trilhas de Auditoria | UC-JOR-020-exportar-espelho-e-trilhas-de-auditoria.md |

---

# Escopo Funcional

- Jornada de trabalho
- Escalas
- Registro de ponto
- Importação de marcações
- Tratamento de inconsistências
- Solicitação de ajuste
- Aprovação de ajuste
- Horas extras
- Adicional noturno
- Banco de horas
- Espelho de ponto
- Fechamento e reabertura de período
- Calendário de feriados e exceções
- Regras de tolerância de ponto
- Dispositivos de ponto
- Comprovante de marcação
- Adicional noturno
- DSR e descanso semanal
- Consolidação de eventos para folha
- Exportação de espelho e trilhas
- Integração com folha
- Integração com workflow
- Auditoria

---

## Analise de Sequenciamento

O `UC-JOR` e o pacote operacional que liga o cadastro do colaborador ao controle de ponto, a folha e o eSocial. A decomposicao por casos de uso deve seguir a dependencia funcional do dominio:

1. `UC-JOR-001` - Cadastrar Jornada de Trabalho.
2. `UC-JOR-002` - Cadastrar Escala de Trabalho.
3. `UC-JOR-013` - Configurar Calendario de Feriados e Excecoes.
4. `UC-JOR-014` - Configurar Regras de Tolerancia de Ponto.
5. `UC-JOR-015` - Registrar e Gerenciar Dispositivos de Ponto.
6. `UC-JOR-003` - Registrar Marcacao de Ponto.
7. `UC-JOR-004` - Importar Marcacoes de Ponto.
8. `UC-JOR-005` - Tratar Inconsistencias de Ponto.
9. `UC-JOR-006` - Solicitar Ajuste de Ponto.
10. `UC-JOR-007` - Aprovar Ajuste de Ponto.
11. `UC-JOR-008` - Calcular Horas Extras.
12. `UC-JOR-009` - Calcular Banco de Horas.
13. `UC-JOR-017` - Calcular Adicional Noturno.
14. `UC-JOR-018` - Aplicar Regras de DSR e Descanso Semanal.
15. `UC-JOR-019` - Consolidar Eventos de Ponto para Folha.
16. `UC-JOR-010` - Gerar Espelho de Ponto.
17. `UC-JOR-011` - Fechar Periodo de Ponto.
18. `UC-JOR-012` - Reabrir Periodo de Ponto.
19. `UC-JOR-016` - Emitir Comprovante de Marcacao.
20. `UC-JOR-020` - Exportar Espelho e Trilhas de Auditoria.

## Prioridade de Analise

- A primeira camada de leitura deve fechar o contrato de configuracao do ponto: jornada, escala, feriados, tolerancia e dispositivos.
- A segunda camada deve cobrir a captura e tratamento das marcacoes, incluindo ajustes e inconsistencias.
- A terceira camada deve fechar os calculos que alimentam a folha e os apontamentos legais.
- A ultima camada deve cobrir espelho, fechamento, comprovantes e exportacao auditavel.
- O runtime atual ja possui persistencia minima para configuracao e calculos de adicional noturno, DSR e consolidacao, entao os gaps mais sensiveis estao em marcacao, ajuste, fechamento e exportacao.

## Pontos de Atencao

- Jornada, escala e regras de tolerancia nao podem perder historico.
- A marcacao precisa respeitar a jornada vigente e o contexto do colaborador.
- Ajustes e inconsistencias exigem trilha auditavel e, quando aplicavel, aprovacao.
- Calculos de horas extras, banco de horas, adicional noturno e DSR precisam ser derivados de regras versionadas.
- Exportacoes e comprovantes precisam respeitar LGPD, finalidade e escopo.
