# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-API-010 - Monitorar Integracoes

### Versao

1.0

---

# Objetivo

Monitorar as integracoes ativas com indicadores de status, falha e reprocessamento.

---

# Atores

- Analista de Integrações
- Gestor de Segurança
- Administrador do Sistema

---

# Pre-condicoes

- Integracoes cadastradas.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a operacao precisa acompanhar a saude das integracoes.

---

# Fluxo Principal

1. Usuario acessa Integracoes > Monitoramento.
2. Sistema apresenta a lista e os status.
3. Usuario filtra por integrações ou falhas.
4. Sistema consolida os indicadores.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O monitoramento deve ser auditavel.
- A visibilidade deve respeitar o escopo do usuario.

---

# Entidades Envolvidas

## IntegrationMonitoringSnapshot

```text
id
integration_id
status
captured_at
```

---

# Testes

- Monitorar integracao valida.
- Bloquear escopo sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o pacote ao expor o estado operacional das integracoes.
