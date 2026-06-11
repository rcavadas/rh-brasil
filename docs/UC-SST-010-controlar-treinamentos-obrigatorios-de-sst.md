# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-010 - Controlar Treinamentos Obrigatorios de SST

### Versao

1.0

---

# Objetivo

Controlar treinamentos obrigatorios de SST com vigencia, obrigatoriedade e historico.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- Treinamento cadastrado.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando o treinamento obrigatorio precisa ser controlado.

---

# Fluxo Principal

1. Usuario acessa SST > Treinamentos.
2. Sistema apresenta o treinamento.
3. Usuario registra ou atualiza a participacao.
4. Sistema valida vigencia.
5. Sistema grava o controle.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O treinamento deve ser rastreavel.
- O vencimento deve ser controlado.

---

# Entidades Envolvidas

## SafetyTrainingControl

```text
id
employee_id
training_name
valid_until
status
```

---

# Testes

- Controlar treinamento valido.
- Bloquear sem colaborador.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o pacote ao controlar vigencia e obrigatoriedade dos treinamentos.
