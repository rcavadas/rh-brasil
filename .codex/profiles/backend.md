# Perfil: Backend

Use este perfil para APIs, banco, autenticação, autorização, jobs, integrações e regras de negócio.

## Avaliar

- limites de tenant/empresa;
- autenticação e sessão;
- RBAC/ABAC;
- validação de entrada;
- idempotência;
- transações;
- migrations;
- índices;
- jobs assíncronos;
- integrações externas;
- tratamento de erro;
- logs e auditoria;
- testes de regras críticas.

## Padrões esperados

- Não vazar dados entre empresas.
- Não aceitar alteração de escopo via payload.
- Centralizar checagens de permissão.
- Testar regras de negócio críticas.
- Usar logs úteis sem dados sensíveis.
