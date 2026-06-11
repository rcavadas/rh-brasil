# Sistema de RH para o Mercado Brasileiro

# Pacote UC-FER - Ferias

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao de ferias, cobrindo periodo aquisitivo, concessivo, solicitacao, aprovacao, calculo e integracao com folha.
O runtime executavel agora tambem possui uma primeira camada funcional de ferias, com saldo por periodo, janela concessiva derivada, validacao de conflito de datas, fracionamento, abono pecuniario, solicitacao, aprovacao, aviso formal, pagamento, envio para folha, transmissao ao eSocial e cancelamento auditavel.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-FER-001 - Apurar Periodo Aquisitivo | Controle do periodo aquisitivo de ferias. |
| UC-FER-002 - Controlar Periodo Concessivo | Controle de prazo concessivo e vencimentos. |
| UC-FER-003 - Consultar Saldo de Ferias | Consulta de saldo disponivel e vencimentos. |
| UC-FER-004 - Solicitar Ferias | Solicitacao de ferias pelo colaborador ou gestor. |
| UC-FER-005 - Aprovar Ferias | Aprovar, rejeitar ou ajustar a solicitacao. |
| UC-FER-006 - Calcular Ferias | Calculo de ferias, medias e verbas correlatas. |
| UC-FER-007 - Calcular Abono Pecuniario | Conversao parcial em abono. |
| UC-FER-008 - Programar Ferias Coletivas | Programacao coletiva por empresa ou unidade. |
| UC-FER-009 - Emitir Aviso de Ferias | Emissao do aviso formal e trilha. |
| UC-FER-010 - Integrar Ferias com Folha | Reflexo de ferias na folha e eSocial. |

---

# Escopo Funcional

- Periodo aquisitivo e concessivo
- Saldo de ferias
- Solicitacao e aprovacao
- Calculo e abono pecuniario
- Ferias coletivas
- Aviso de ferias
- Integracao com folha e eSocial

---

## Analise de Sequenciamento

O `UC-FER` fecha a trilha legal de afastamento programado e afeta folha, contratos e calculos rescisorios. A decomposicao por casos de uso deve seguir a dependencia do periodo aquisitivo e da aprovacao:

1. `UC-FER-001` - Apurar Periodo Aquisitivo.
2. `UC-FER-002` - Controlar Periodo Concessivo.
3. `UC-FER-003` - Consultar Saldo de Ferias.
4. `UC-FER-004` - Solicitar Ferias.
5. `UC-FER-005` - Aprovar Ferias.
6. `UC-FER-006` - Calcular Ferias.
7. `UC-FER-007` - Calcular Abono Pecuniario.
8. `UC-FER-009` - Emitir Aviso de Ferias.
9. `UC-FER-010` - Integrar Ferias com Folha.
10. `UC-FER-008` - Programar Ferias Coletivas.

## Prioridade de Analise

- A primeira camada deve consolidar periodo aquisitivo, concessivo e saldo.
- A segunda camada deve cobrir a solicitacao, aprovacao e calculo individual.
- A terceira camada deve fechar abono, aviso formal e reflexo na folha.
- A programacao de ferias coletivas pode ser tratada depois do ciclo individual, porque depende das mesmas bases.
- O runtime atual ja possui uma primeira camada funcional de ferias, entao os gaps prioritarios estao em governanca coletiva, validacoes finais e alinhamento com as demais verbas.

## Pontos de Atencao

- Periodo aquisitivo e concessivo precisam ser coerentes com a historia do colaborador.
- A janela concessiva deve bloquear pedidos inconsistentes.
- Ferias precisam refletir de forma previsivel em folha e eSocial.
- Abono pecuniario e ferias coletivas exigem tratamento juridico-operacional especifico.
- Avisos e calculos devem permanecer auditaveis e rastreaveis por competencia.
