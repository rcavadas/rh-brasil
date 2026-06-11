# UC-LMS-004

## Executar Treinamento

### Objetivo

Permitir o registro da execucao e participacao em treinamento.

---

# Atores

## Primarios

* Colaborador

## Secundarios

* LMS
* Auditoria

---

# Pre-condicoes

* Matricula ativa.
* Sessao de treinamento disponivel.

---

# Gatilho

O processo inicia quando o treinamento e executado.

---

# Fluxo Principal

### Etapa 1

Sistema inicia a sessao.

### Etapa 2

Colaborador participa do treinamento.

### Etapa 3

Sistema registra presenca ou conclusao.

### Etapa 4

Sistema atualiza o progresso.

### Etapa 5

Sistema registra auditoria.

---

# Fluxos Alternativos

## FA-01 - Abandono

### Condicao

O colaborador nao conclui a sessao.

### Fluxo

* Sistema mantém o progresso parcial.

---

# Pos-condicoes

* Execucao registrada.
* Auditoria registrada.

---

# Regras de Negocio Relacionadas

* A execucao deve ficar associada ao colaborador.
* O progresso deve ser historico.

---

# Entidades Envolvidas

## TrainingSession

```text
id
enrollment_id
status
completed_at
```

---

# Casos Relacionados

* UC-LMS-005 - Aplicar Avaliacao
* UC-LMS-006 - Emitir Certificado
