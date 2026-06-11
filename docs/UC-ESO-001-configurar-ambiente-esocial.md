# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-001 - Configurar Ambiente eSocial

### Versao

1.0

---

# Objetivo

Configurar o ambiente do eSocial para transmissao, homologacao e operacao.

---

# Atores

- Administrador do Sistema
- Gestor de Seguranca

---

# Pre-condicoes

- Usuario autenticado.
- Ambiente governamental disponivel.

---

# Gatilho

O processo inicia quando o ambiente eSocial precisa ser configurado.

---

# Fluxo Principal

1. Usuario acessa eSocial > Ambiente.
2. Sistema apresenta os parametros.
3. Usuario informa a configuracao.
4. Sistema valida o contrato.
5. Sistema grava o ambiente.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O ambiente deve ser rastreavel.
- Alteracoes devem preservar historico.

---

# Entidades Envolvidas

## EsocialEnvironmentConfig

```text
id
tenant_id
environment_type
status
```

---

# Testes

- Configurar ambiente valido.
- Bloquear contrato inconsistente.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre o motor regulatorio do eSocial ao definir o ambiente de transmissao.

---

# Estado de Implementacao

O runtime executavel atual ja possui um contrato minimo de eSocial para transmissao de admissao, desligamento e reprocessamento explicito, mas a configuracao formal do ambiente ainda precisa ser tratada como camada documental e operacional separada.
