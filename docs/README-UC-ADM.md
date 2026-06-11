# Sistema de RH para o Mercado Brasileiro

# Pacote UC-ADM - Administracao de Pessoal

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao do cadastro corporativo, da estrutura organizacional e do cadastro de colaboradores, cobrindo empresas, filiais, lotacoes, cargos, vinculos, dependentes e historico cadastral.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-ADM-001 - Cadastrar colaborador | Cadastro base do colaborador e dados pessoais. |
| UC-ADM-002 - Alterar dados cadastrais do colaborador | Atualizacao controlada de dados cadastrais e funcionais. |
| UC-ADM-003 - Consultar historico cadastral | Consulta de historico e trilha de alteracoes. |
| UC-ADM-004 - Cadastrar dependentes | Gestao de dependentes e suas finalidades legais. |
| UC-ADM-005 - Cadastrar vinculo empregaticio | Formalizacao do vinculo trabalhista e contratual. |
| UC-ADM-006 - Registrar alteracao contratual | Mudancas contratuais e reprocessos associados. |
| UC-ADM-007 - Registrar promocao | Promocoes e evolucao funcional. |
| UC-ADM-008 - Registrar transferencia | Transferencias internas e seus impactos. |
| UC-ADM-009 - Registrar afastamento | Afastamentos e efeitos sobre o vinculo. |
| UC-ADM-010 - Registrar desligamento administrativo | Encerramento administrativo do vinculo. |

---

# Escopo Funcional

- Cadastro corporativo
- Empresas e filiais
- Estrutura organizacional
- Cargos e funcoes
- Vinculo trabalhista
- Dependentes
- Historico cadastral
- Movimentacoes funcionais
- Afastamentos e desligamento
- Integracao com eSocial, folha, beneficios e SST

## Estado de Implementacao

Este pacote descreve o comportamento desejado do dominio.
O runtime executavel atual ja implementa o cadastro-base, a etapa 1 de admissao, o checklist documental minimo, a formalizacao contratual separada, um dossie documental de onboarding com assinatura auditavel, a trilha minima de eSocial, o desligamento administrativo minimo, o offboarding minimo, o eSocial de desligamento minimo e um scaffold minimo de rescisao; os fluxos completos continuam como evolucao posterior.
O runtime executavel tambem ja possui um scaffold minimo de rescisao vinculado ao desligamento efetivo; o pacote UC-RES continua descrevendo a evolucao completa do processo.

## Analise de Sequenciamento

O `UC-ADM` e o pacote fundacional do ciclo de vida do colaborador. A decomposicao por casos de uso deve seguir a dependência de dados e a ordem operacional do RH:

1. `UC-ADM-001` - Cadastrar colaborador.
2. `UC-ADM-005` - Cadastrar vinculo empregaticio.
3. `UC-ADM-002` - Alterar dados cadastrais do colaborador.
4. `UC-ADM-003` - Consultar historico cadastral.
5. `UC-ADM-004` - Cadastrar dependentes.
6. `UC-ADM-006` - Registrar alteracao contratual.
7. `UC-ADM-007` - Registrar promocao.
8. `UC-ADM-008` - Registrar transferencia.
9. `UC-ADM-009` - Registrar afastamento.
10. `UC-ADM-010` - Registrar desligamento administrativo.

## Prioridade de Analise

- A primeira leitura deve consolidar o cadastro-base e o vinculo empregaticio, porque esses dados habilitam os demais modulos.
- Em seguida, o historico cadastral e os dependentes devem fechar a trilha administrativa do colaborador.
- Depois disso entram as movimentacoes funcionais, afastamentos e o desligamento administrativo.
- O runtime atual ja cobre parcialmente o fluxo de admissao e o desligamento administrativo, entao os gaps prioritarios estao na formalizacao do contrato, no historico, nas alteracoes cadastrais e nas movimentacoes intermediarias.

## Pontos de Atencao

- O cadastro-base nao deve ser confundido com a formalizacao completa do vinculo.
- O historico precisa ser imutavel e auditavel.
- As movimentacoes devem preservar a linha do tempo do colaborador sem sobrescrever eventos anteriores.
- Dependentes podem introduzir requisitos LGPD e regras de finalidade especifica.
