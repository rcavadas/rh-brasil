
# Domínio RH (Atualização)

## Conceito Central

Pessoa -> VinculoTrabalhista -> Empresa

O sistema não deve tratar colaborador como entidade principal.

## Eventos do Domínio

- Admissão
- Promoção
- Transferência
- Alteração salarial
- Férias
- Afastamento
- Retorno
- Desligamento

## Regras Fundamentais

1. Todo vínculo pertence a uma empresa.
2. Toda movimentação gera histórico.
3. Todo evento relevante gera auditoria.
4. Dados sensíveis seguem LGPD.
5. Integrações nunca alteram histórico.
