# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SEC-009 - Registrar Incidente de Seguranca

### Versao

1.0

---

# Objetivo

Registrar incidente de seguranca com classificacao, evidencias e trilha de resposta.

---

# Atores

- Gestor de Seguranca
- Administrador do Sistema

---

# Pre-condicoes

- Incidente identificado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando um incidente precisa ser formalizado.

---

# Fluxo Principal

1. Usuario acessa seguranca > incidentes.
2. Sistema apresenta o formulario.
3. Usuario registra o incidente.
4. Sistema classifica e armazena a ocorrencia.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O incidente deve ser rastreavel.
- A resposta deve preservar evidencias.

---

# Entidades Envolvidas

## SecurityIncident

```text
id
incident_type
severity
status
reported_at
```

---

# Testes

- Registrar incidente valido.
- Bloquear falta de dados essenciais.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso formaliza a resposta a incidentes depois das regras de acesso e privacidade.
