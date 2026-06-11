# Sistema de RH para o Mercado Brasileiro

# Pacote UC-ATS - Recrutamento e Selecao

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao do ATS, cobrindo requisicao de vaga, publicacao, triagem, entrevistas, proposta e conversao em pre-admissao.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-ATS-001 - Criar Requisicao de Vaga | Abertura de vaga. |
| UC-ATS-002 - Aprovar Vaga | Aprovacao da requisicao. |
| UC-ATS-003 - Publicar Vaga | Publicacao em canais permitidos. |
| UC-ATS-004 - Cadastrar Candidato | Cadastro do candidato. |
| UC-ATS-005 - Triar Curriculo | Triagem automatizada ou manual. |
| UC-ATS-006 - Movimentar Candidato no Pipeline | Fluxo entre etapas. |
| UC-ATS-007 - Agendar Entrevista | Agendamento com entrevistadores. |
| UC-ATS-008 - Registrar Avaliacao do Candidato | Avaliacao por criterio. |
| UC-ATS-009 - Emitir Proposta | Proposta de emprego. |
| UC-ATS-010 - Converter Candidato em Pre-Admissao | Transicao para onboarding. |

---

# Escopo Funcional

- Requisicao de vaga
- Publicacao
- Banco de curriculos
- Pipeline seletivo
- Entrevistas e avaliacoes
- Proposta
- Conversao para pre-admissao

## Estado no runtime

- Requisicao de vaga, aprovacao, publicacao, cadastro de candidato e movimentacao inicial no pipeline ja estao executaveis no backend.
- O backend tambem executa o agendamento de entrevistas e o registro de avaliacao inicial de candidatos.
- O backend tambem executa proposta e conversao para pre-admissao, com criacao de admissao draft rastreavel.
- O fluxo de admissao agora tambem expõe dossie documental proprio, com onboarding e assinatura rastreavel.
- O proximo recorte natural do dominio segue para refinamentos de onboarding, provisionamento e experiencia inicial.
