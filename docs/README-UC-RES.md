# Sistema de RH para o Mercado Brasileiro

# Pacote UC-RES - Rescisao

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao da rescisao, incluindo registro do desligamento, calculos rescisorios, documentos e transmissao ao eSocial.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-RES-001 - Registrar Desligamento | Inicio formal do processo de rescisao. |
| UC-RES-002 - Definir Motivo de Desligamento | Classificacao e regras associadas. |
| UC-RES-003 - Calcular Aviso Previo | Aviso trabalhado ou indenizado. |
| UC-RES-004 - Calcular Saldo de Salario | Saldo proporcional da competencia. |
| UC-RES-005 - Calcular Ferias Rescisorias | Ferias vencidas e proporcionais. |
| UC-RES-006 - Calcular Decimo Terceiro Proporcional | 13o proporcional e reflexos. |
| UC-RES-007 - Calcular FGTS Rescisorio | Reflexos fundiarios e multa. |
| UC-RES-008 - Gerar Documentos Rescisorios | Termos, guias e comprovantes. |
| UC-RES-009 - Fechar Rescisao | Fechamento operacional do processo. |
| UC-RES-010 - Transmitir Desligamento ao eSocial | Envio do desligamento ao governo. |

---

# Escopo Funcional

- Desligamento e motivo
- Aviso previo
- Saldo salarial
- Ferias e 13o proporcionais
- FGTS rescisorio
- Documentos rescisorios
- Fechamento e eSocial

## Estado de Implementacao

O runtime executavel atual ja possui um fluxo minimo de rescisao vinculado a `TerminationRequest`, com criacao somente apos desligamento efetivo, consulta, memoria de calculo, prazo de pagamento calculado a partir da data de desligamento, geracao de documentos assinaveis, assinatura rastreavel, fechamento, cancelamento e trilha de historico/auditoria.
O runtime executavel tambem ja possui offboarding minimo e eSocial de desligamento minimo, mas o pacote UC-RES continua descrevendo a evolucao completa de verbas, documentos e transmissao governamental final.
No runtime atual, a assinatura dos documentos rescisorios usa `govbr_advanced` como padrao e admite `icp_brasil` como excecao valida quando informada.

---

## Analise de Sequenciamento

O `UC-RES` fecha o ciclo de vida do colaborador e depende do historico de admissao, ponto, ferias, folha e desligamento administrativo. A decomposicao por casos de uso deve seguir a progressao legal do encerramento:

1. `UC-RES-001` - Registrar Desligamento.
2. `UC-RES-002` - Definir Motivo de Desligamento.
3. `UC-RES-003` - Calcular Aviso Previo.
4. `UC-RES-004` - Calcular Saldo de Salario.
5. `UC-RES-005` - Calcular Ferias Rescisorias.
6. `UC-RES-006` - Calcular Decimo Terceiro Proporcional.
7. `UC-RES-007` - Calcular FGTS Rescisorio.
8. `UC-RES-008` - Gerar Documentos Rescisorios.
9. `UC-RES-009` - Fechar Rescisao.
10. `UC-RES-010` - Transmitir Desligamento ao eSocial.

## Prioridade de Analise

- A primeira camada deve fechar o registro de desligamento e a classificacao do motivo.
- A segunda camada deve cobrir os calculos rescisorios e seus reflexos legais.
- A terceira camada deve cobrir os documentos, o fechamento e a transmissao governamental.
- O runtime atual ja possui um fluxo minimo executavel, entao os gaps prioritarios estao na evolucao completa das verbas, dos documentos e da transmissao final ao eSocial.

## Pontos de Atencao

- O desligamento deve permanecer vinculado ao estado real do contrato.
- Os calculos de aviso, saldo salarial, ferias, 13o e FGTS precisam ser consistentes com a folha e com o historico do colaborador.
- Documentos rescisorios precisam manter assinatura, trilha e versionamento.
- O fechamento nao pode apagar historico nem ocultar memoria de calculo.
- A transmissao ao eSocial precisa permanecer rastreavel e reprocessavel quando aplicavel.
