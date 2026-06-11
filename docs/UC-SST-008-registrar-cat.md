# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-008 - Registrar CAT

### Versao

1.0

---

# Objetivo

Registrar comunicacao de acidente de trabalho com trilha e evidencias.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- Ocorrencia identificada.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando uma CAT precisa ser registrada.

---

# Fluxo Principal

1. Usuario acessa SST > CAT.
2. Sistema apresenta o formulario.
3. Usuario informa os dados da ocorrencia.
4. Sistema valida o registro.
5. Sistema grava a CAT.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A CAT deve ser rastreavel.
- A evidencia deve ser preservada.

---

# Entidades Envolvidas

## WorkAccidentReport

```text
id
employee_id
incident_date
status
```

---

# Testes

- Registrar CAT valida.
- Bloquear sem dados essenciais.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso registra a comunicacao de acidente e fecha a trilha de ocorrencia.
