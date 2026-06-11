# Sistema de RH para o Mercado Brasileiro

# Catálogo Mestre de Casos de Uso

## Versão

1.0

## Objetivo

Este documento apresenta o catálogo mestre de casos de uso do Sistema de RH, organizado por módulos funcionais. Ele serve como ponte entre as Regras de Negócio (RN), o desenho de telas, APIs, modelo de dados, testes e arquitetura da solução.

---

# Convenção de Identificadores

| Prefixo | Módulo                        |
| ------- | ----------------------------- |
| UC-ADM  | Administração de Pessoal      |
| UC-JOR  | Jornada e Ponto               |
| UC-FOL  | Folha de Pagamento            |
| UC-BEN  | Benefícios                    |
| UC-FER  | Férias                        |
| UC-DEC  | Décimo Terceiro               |
| UC-RES  | Rescisão                      |
| UC-SST  | Saúde e Segurança do Trabalho |
| UC-ESO  | eSocial                       |
| UC-COL  | Portal do Colaborador         |
| UC-GST  | Portal do Gestor              |
| UC-WFL  | Workflow e Aprovações         |
| UC-GED  | Gestão Documental             |
| UC-ATS  | Recrutamento e Seleção        |
| UC-ONB  | Onboarding                    |
| UC-LMS  | Treinamentos                  |
| UC-PER  | Avaliação de Desempenho       |
| UC-CAR  | Cargos, Salários e Carreira   |
| UC-BI   | Analytics e BI                |
| UC-SEC  | LGPD, Segurança e Governança  |
| UC-API  | Integrações e APIs            |
| UC-PLT  | Plataforma SaaS               |

---

# UC-ADM — Administração de Pessoal

## UC-ADM-001

Cadastrar colaborador.

## UC-ADM-002

Alterar dados cadastrais do colaborador.

## UC-ADM-003

Consultar histórico cadastral.

## UC-ADM-004

Cadastrar dependentes.

## UC-ADM-005

Cadastrar vínculo empregatício.

## UC-ADM-006

Registrar alteração contratual.

## UC-ADM-007

Registrar promoção.

## UC-ADM-008

Registrar transferência.

## UC-ADM-009

Registrar afastamento.

## UC-ADM-010

Registrar desligamento administrativo.

---

# UC-JOR — Jornada e Ponto

## UC-JOR-001

Cadastrar jornada de trabalho.

## UC-JOR-002

Cadastrar escala de trabalho.

## UC-JOR-003

Registrar marcação de ponto.

## UC-JOR-004

Importar marcações de ponto.

## UC-JOR-005

Tratar inconsistências de ponto.

## UC-JOR-006

Solicitar ajuste de ponto.

## UC-JOR-007

Aprovar ajuste de ponto.

## UC-JOR-008

Calcular horas extras.

## UC-JOR-009

Calcular banco de horas.

## UC-JOR-010

Gerar espelho de ponto.

## UC-JOR-011

Fechar período de ponto.

## UC-JOR-012

Reabrir período de ponto.

## UC-JOR-013

Configurar calendário de feriados e exceções.

## UC-JOR-014

Configurar regras de tolerância de ponto.

## UC-JOR-015

Registrar e gerenciar dispositivos de ponto.

## UC-JOR-016

Emitir comprovante de marcação.

## UC-JOR-017

Calcular adicional noturno.

## UC-JOR-018

Aplicar regras de DSR e descanso semanal.

## UC-JOR-019

Consolidar eventos de ponto para folha.

## UC-JOR-020

Exportar espelho e trilhas de auditoria.

---

# UC-FOL — Folha de Pagamento

## UC-FOL-001

Cadastrar rubrica.

## UC-FOL-002

Configurar incidências da rubrica.

## UC-FOL-003

Processar folha mensal.

## UC-FOL-004

Processar folha complementar.

## UC-FOL-005

Processar adiantamento salarial.

## UC-FOL-006

Calcular INSS.

## UC-FOL-007

Calcular FGTS.

## UC-FOL-008

Calcular IRRF.

## UC-FOL-009

Gerar holerite.

## UC-FOL-010

Fechar folha de pagamento.

---

# UC-BEN — Benefícios

## UC-BEN-001

Cadastrar benefício.

## UC-BEN-002

Configurar elegibilidade de benefício.

## UC-BEN-003

Conceder benefício ao colaborador.

## UC-BEN-004

Suspender benefício.

## UC-BEN-005

Cancelar benefício.

## UC-BEN-006

Gerenciar vale-transporte.

## UC-BEN-007

Gerenciar vale-refeição ou alimentação.

## UC-BEN-008

Gerenciar plano de saúde.

## UC-BEN-009

Importar coparticipação.

## UC-BEN-010

Integrar benefícios com folha.

---

# UC-FER — Férias

## UC-FER-001

Apurar período aquisitivo.

## UC-FER-002

Controlar período concessivo.

## UC-FER-003

Consultar saldo de férias.

## UC-FER-004

Solicitar férias.

## UC-FER-005

Aprovar férias.

## UC-FER-006

Calcular férias.

## UC-FER-007

Calcular abono pecuniário.

## UC-FER-008

Programar férias coletivas.

## UC-FER-009

Emitir aviso de férias.

## UC-FER-010

Integrar férias com folha.

---

# UC-DEC — Décimo Terceiro

## UC-DEC-001

Apurar avos de décimo terceiro.

## UC-DEC-002

Calcular primeira parcela.

## UC-DEC-003

Calcular segunda parcela.

## UC-DEC-004

Calcular médias de verbas variáveis.

## UC-DEC-005

Calcular encargos de décimo terceiro.

## UC-DEC-006

Antecipar décimo terceiro nas férias.

## UC-DEC-007

Calcular décimo terceiro rescisório.

## UC-DEC-008

Gerar demonstrativo de décimo terceiro.

## UC-DEC-009

Fechar folha de décimo terceiro.

## UC-DEC-010

Integrar décimo terceiro ao eSocial.

---

# UC-RES — Rescisão

## UC-RES-001

Registrar desligamento.

## UC-RES-002

Definir motivo de desligamento.

## UC-RES-003

Calcular aviso prévio.

## UC-RES-004

Calcular saldo de salário.

## UC-RES-005

Calcular férias rescisórias.

## UC-RES-006

Calcular décimo terceiro proporcional.

## UC-RES-007

Calcular FGTS rescisório.

## UC-RES-008

Gerar documentos rescisórios.

## UC-RES-009

Fechar rescisão.

## UC-RES-010

Transmitir desligamento ao eSocial.

---

# UC-SST — Saúde e Segurança do Trabalho

## UC-SST-001

Cadastrar ambiente de trabalho.

## UC-SST-002

Cadastrar riscos ocupacionais.

## UC-SST-003

Gerenciar PGR.

## UC-SST-004

Gerenciar PCMSO.

## UC-SST-005

Gerenciar LTCAT.

## UC-SST-006

Registrar exame ocupacional.

## UC-SST-007

Emitir ASO.

## UC-SST-008

Registrar CAT.

## UC-SST-009

Controlar entrega de EPI.

## UC-SST-010

Controlar treinamentos obrigatórios de SST.

---

# UC-ESO — eSocial

## UC-ESO-001

Configurar ambiente eSocial.

## UC-ESO-002

Gerenciar certificado digital.

## UC-ESO-003

Transmitir evento S-1000.

## UC-ESO-004

Transmitir evento S-1005.

## UC-ESO-005

Transmitir evento S-1010.

## UC-ESO-006

Transmitir evento S-2200.

## UC-ESO-007

Transmitir evento S-1200.

## UC-ESO-008

Transmitir evento S-1210.

## UC-ESO-009

Transmitir evento S-1299.

## UC-ESO-010

Conciliar totalizadores do eSocial.

---

# UC-COL — Portal do Colaborador

## UC-COL-001

Acessar portal do colaborador.

## UC-COL-002

Consultar dados cadastrais.

## UC-COL-003

Solicitar atualização cadastral.

## UC-COL-004

Consultar holerite.

## UC-COL-005

Consultar informe de rendimentos.

## UC-COL-006

Solicitar férias.

## UC-COL-007

Consultar banco de horas.

## UC-COL-008

Consultar benefícios.

## UC-COL-009

Abrir solicitação ao RH.

## UC-COL-010

Assinar documento eletrônico.

---

# UC-GST — Portal do Gestor

## UC-GST-001

Visualizar equipe.

## UC-GST-002

Aprovar férias.

## UC-GST-003

Aprovar ajuste de ponto.

## UC-GST-004

Aprovar horas extras.

## UC-GST-005

Acompanhar admissões.

## UC-GST-006

Solicitar desligamento.

## UC-GST-007

Consultar indicadores da equipe.

## UC-GST-008

Consultar absenteísmo.

## UC-GST-009

Consultar turnover.

## UC-GST-010

Exportar dados autorizados da equipe.

---

# UC-WFL — Workflow e Aprovações

## UC-WFL-001

Criar fluxo de aprovação.

## UC-WFL-002

Configurar etapas do fluxo.

## UC-WFL-003

Configurar aprovadores.

## UC-WFL-004

Configurar SLA.

## UC-WFL-005

Executar aprovação sequencial.

## UC-WFL-006

Executar aprovação paralela.

## UC-WFL-007

Escalonar solicitação.

## UC-WFL-008

Delegar aprovação.

## UC-WFL-009

Reabrir processo.

## UC-WFL-010

Auditar histórico do workflow.

---

# UC-GED — Gestão Documental

## UC-GED-001

Cadastrar tipo documental.

## UC-GED-002

Anexar documento ao colaborador.

## UC-GED-003

Gerar documento automaticamente.

## UC-GED-004

Versionar documento.

## UC-GED-005

Assinar documento eletronicamente.

## UC-GED-006

Assinar documento com ICP-Brasil.

## UC-GED-007

Consultar prontuário eletrônico.

## UC-GED-008

Aplicar política de retenção.

## UC-GED-009

Descartar documento autorizado.

## UC-GED-010

Auditar movimentação documental.

---

# UC-ATS — Recrutamento e Seleção

## UC-ATS-001

Criar requisição de vaga.

## UC-ATS-002

Aprovar vaga.

## UC-ATS-003

Publicar vaga.

## UC-ATS-004

Cadastrar candidato.

## UC-ATS-005

Triar currículo.

## UC-ATS-006

Movimentar candidato no pipeline.

## UC-ATS-007

Agendar entrevista.

## UC-ATS-008

Registrar avaliação do candidato.

## UC-ATS-009

Emitir proposta.

## UC-ATS-010

Converter candidato em pré-admissão.

---

# UC-ONB — Onboarding

## UC-ONB-001

Criar processo de pré-admissão.

## UC-ONB-002

Enviar convite ao candidato.

## UC-ONB-003

Coletar dados cadastrais.

## UC-ONB-004

Coletar documentos admissionais.

## UC-ONB-005

Executar checklist admissional.

## UC-ONB-006

Assinar contrato de trabalho.

## UC-ONB-007

Solicitar provisionamento de acessos.

## UC-ONB-008

Solicitar equipamentos.

## UC-ONB-009

Atribuir treinamentos iniciais.

## UC-ONB-010

Acompanhar período de experiência.

---

# UC-LMS — Treinamentos

## UC-LMS-001

Cadastrar curso.

## UC-LMS-002

Criar trilha de aprendizagem.

## UC-LMS-003

Matricular colaborador.

## UC-LMS-004

Executar treinamento.

## UC-LMS-005

Aplicar avaliação.

## UC-LMS-006

Emitir certificado.

## UC-LMS-007

Controlar reciclagem obrigatória.

## UC-LMS-008

Vincular curso a competência.

## UC-LMS-009

Consultar histórico de treinamento.

## UC-LMS-010

Gerar indicadores de aprendizagem.

---

# UC-PER — Avaliação de Desempenho

## UC-PER-001

Criar ciclo de avaliação.

## UC-PER-002

Executar avaliação 90°.

## UC-PER-003

Executar avaliação 180°.

## UC-PER-004

Executar avaliação 360°.

## UC-PER-005

Avaliar competências.

## UC-PER-006

Avaliar metas.

## UC-PER-007

Registrar feedback contínuo.

## UC-PER-008

Criar PDI.

## UC-PER-009

Calibrar resultados.

## UC-PER-010

Gerar matriz desempenho-potencial.

---

# UC-CAR — Cargos, Salários e Carreira

## UC-CAR-001

Cadastrar estrutura organizacional.

## UC-CAR-002

Cadastrar cargo.

## UC-CAR-003

Cadastrar função.

## UC-CAR-004

Cadastrar faixa salarial.

## UC-CAR-005

Cadastrar tabela salarial.

## UC-CAR-006

Registrar promoção.

## UC-CAR-007

Registrar progressão.

## UC-CAR-008

Criar plano de carreira.

## UC-CAR-009

Monitorar equidade salarial.

## UC-CAR-010

Gerenciar sucessão.

---

# UC-BI — Analytics e BI

## UC-BI-001

Consultar dashboard executivo.

## UC-BI-002

Consultar headcount.

## UC-BI-003

Consultar turnover.

## UC-BI-004

Consultar absenteísmo.

## UC-BI-005

Consultar custos de pessoal.

## UC-BI-006

Consultar indicadores de recrutamento.

## UC-BI-007

Consultar indicadores de treinamento.

## UC-BI-008

Consultar indicadores de desempenho.

## UC-BI-009

Consultar indicadores de SST.

## UC-BI-010

Exportar indicadores.

---

# UC-SEC — LGPD, Segurança e Governança

## UC-SEC-001

Gerenciar perfis de acesso.

## UC-SEC-002

Gerenciar permissões.

## UC-SEC-003

Configurar MFA.

## UC-SEC-004

Configurar SSO.

## UC-SEC-005

Registrar consentimento.

## UC-SEC-006

Atender solicitação do titular.

## UC-SEC-007

Anonimizar dados.

## UC-SEC-008

Aplicar política de retenção.

## UC-SEC-009

Registrar incidente de segurança.

## UC-SEC-010

Auditar acessos e operações.

---

# UC-API — Integrações e APIs

## UC-API-001

Cadastrar integração.

## UC-API-002

Configurar API REST.

## UC-API-003

Configurar webhook.

## UC-API-004

Publicar evento.

## UC-API-005

Consumir evento.

## UC-API-006

Integrar com ERP.

## UC-API-007

Integrar com banco.

## UC-API-008

Integrar com operadora de benefícios.

## UC-API-009

Integrar com provedor de identidade.

## UC-API-010

Monitorar integrações.

---

# UC-PLT — Plataforma SaaS

## UC-PLT-001

Cadastrar tenant.

## UC-PLT-002

Cadastrar empresa.

## UC-PLT-003

Cadastrar filial.

## UC-PLT-004

Configurar isolamento de dados.

## UC-PLT-005

Configurar parametrizações por tenant.

## UC-PLT-006

Monitorar disponibilidade.

## UC-PLT-007

Executar backup.

## UC-PLT-008

Executar restauração.

## UC-PLT-009

Monitorar performance.

## UC-PLT-010

Auditar governança da plataforma.

---

# Priorização Recomendada

## MVP Legal

* UC-ADM
* UC-JOR
* UC-FOL
* UC-FER
* UC-RES
* UC-SST
* UC-ESO
* UC-SEC

## MVP Operacional

* UC-COL
* UC-GST
* UC-WFL
* UC-GED

## Expansão HCM

* UC-ATS
* UC-ONB
* UC-LMS
* UC-PER
* UC-CAR
* UC-BI

## Plataforma Enterprise

* UC-API
* UC-PLT
