# Sistema de RH para o Mercado Brasileiro

# Pacote UC-BEN - Beneficios

## Versao

1.0

## Objetivo

Este pacote consolida a documentacao dos beneficios corporativos, incluindo elegibilidade, concessao, suspensao, cancelamento e integracao com a folha.

---

# Arquivos

| Caso de Uso | Descricao |
|---|---|
| UC-BEN-001 - Cadastrar Beneficio | Cadastro do catalogo de beneficios. |
| UC-BEN-002 - Configurar Elegibilidade de Beneficio | Regras de elegibilidade por perfil e vinculo. |
| UC-BEN-003 - Conceder Beneficio ao Colaborador | Concessao operacional do beneficio. |
| UC-BEN-004 - Suspender Beneficio | Suspensao temporaria com rastreabilidade. |
| UC-BEN-005 - Cancelar Beneficio | Cancelamento do beneficio e efeitos posteriores. |
| UC-BEN-006 - Gerenciar Vale-Transporte | Gestao de VT, rotas e desconto. |
| UC-BEN-007 - Gerenciar Vale-Refeicao ou Alimentacao | Gestao de VR/VA e fornecedores. |
| UC-BEN-008 - Gerenciar Plano de Saude | Adesao, elegibilidade e coparticipacao. |
| UC-BEN-009 - Importar Coparticipacao | Importacao de valores e rateios. |
| UC-BEN-010 - Integrar Beneficios com Folha | Reflexos de beneficios na folha. |

---

# Escopo Funcional

- Elegibilidade
- Concessao e manutencao
- Vale-transporte
- Vale-refeicao e alimentacao
- Plano de saude
- Coparticipacao
- Integracao com folha e portal

---

## Analise de Sequenciamento

O `UC-BEN` trata de concessao e manutencao de beneficios que reverberam em folha e podem carregar regras sensiveis de elegibilidade. A decomposicao por casos de uso deve seguir a dependencia de catalogo, elegibilidade e reflexo financeiro:

1. `UC-BEN-001` - Cadastrar Beneficio.
2. `UC-BEN-002` - Configurar Elegibilidade de Beneficio.
3. `UC-BEN-003` - Conceder Beneficio ao Colaborador.
4. `UC-BEN-004` - Suspender Beneficio.
5. `UC-BEN-005` - Cancelar Beneficio.
6. `UC-BEN-006` - Gerenciar Vale-Transporte.
7. `UC-BEN-007` - Gerenciar Vale-Refeicao ou Alimentacao.
8. `UC-BEN-008` - Gerenciar Plano de Saude.
9. `UC-BEN-009` - Importar Coparticipacao.
10. `UC-BEN-010` - Integrar Beneficios com Folha.

## Prioridade de Analise

- A primeira camada deve fechar o catalogo e a elegibilidade por perfil, contrato e tenant.
- A segunda camada deve cobrir concessao, suspensao e cancelamento com rastreabilidade.
- A terceira camada deve tratar os beneficios mais comuns de operacao, como VT, VR/VA e plano de saude.
- A quarta camada deve consolidar coparticipacao e reflexo em folha.
- O runtime atual ja possui uma primeira camada funcional de beneficios, e a elegibilidade minima por empresa e colaborador tambem foi implementada; os gaps prioritarios restantes estao na elegibilidade mais fina, na manutencao de catalogo e no reflexo consistente em folha.

## Pontos de Atencao

- Elegibilidade precisa respeitar contrato, perfil e eventual regra por tenant.
- Beneficios com coparticipacao exigem rastreabilidade financeira.
- Suspensao e cancelamento precisam preservar historico e nao apagar concessoes anteriores.
- Integração com folha deve evitar duplicidade de descontos ou concessoes.
- Dados associados a plano de saude e coparticipacao pedem cuidado LGPD e controle de acesso.
