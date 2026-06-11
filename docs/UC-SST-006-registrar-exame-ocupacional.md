# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-006 - Registrar Exame Ocupacional

### Versao

1.0

---

# Objetivo

Registrar exames ocupacionais vinculados ao colaborador e ao contexto de SST.

---

# Atores

- Analista de SST
- Medicina Ocupacional

---

# Pre-condicoes

- Colaborador ativo.
- Ambiente e riscos cadastrados.

---

# Gatilho

O processo inicia quando um exame ocupacional precisa ser registrado.

---

# Fluxo Principal

1. Usuario acessa SST > Exames.
2. Sistema apresenta o cadastro.
3. Usuario informa os dados do exame.
4. Sistema valida o contexto.
5. Sistema grava o exame.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O exame deve ser rastreavel.
- Dados sensiveis devem ser protegidos.

---

# Entidades Envolvidas

## OccupationalExam

```text
id
employee_id
environment_id
exam_type
status
```

---

# Testes

- Registrar exame valido.
- Bloquear colaborador invalido.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre a camada de saude ocupacional associada ao colaborador.
