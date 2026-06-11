# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-SST-009 - Controlar Entrega de EPI

### Versao

1.0

---

# Objetivo

Controlar entrega, ciencia e vencimento de EPI para colaboradores.

---

# Atores

- Analista de SST
- Administrador do Sistema

---

# Pre-condicoes

- EPI cadastrado.
- Colaborador ativo.

---

# Gatilho

O processo inicia quando um EPI precisa ser entregue ou renovado.

---

# Fluxo Principal

1. Usuario acessa SST > EPI.
2. Sistema apresenta o controle.
3. Usuario registra a entrega.
4. Sistema valida o item e o colaborador.
5. Sistema grava a entrega.
6. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A entrega deve ser rastreavel.
- O vencimento deve ser controlado.

---

# Entidades Envolvidas

## PersonalProtectionEquipmentDelivery

```text
id
employee_id
equipment_name
delivery_date
status
```

---

# Testes

- Registrar entrega valida.
- Bloquear sem colaborador.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso cobre a logistica e rastreabilidade de equipamentos de protecao.
