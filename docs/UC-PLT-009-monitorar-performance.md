# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-009 - Monitorar Performance

### Versao

1.0

---

# Objetivo

Monitorar performance da plataforma para identificar gargalos e degradacoes.

---

# Atores

- Gestor de Plataforma
- Administrador do Sistema

---

# Pre-condicoes

- Telemetria disponivel.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a performance precisa ser avaliada.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Performance.
2. Sistema apresenta metricas.
3. Usuario seleciona o intervalo.
4. Sistema consolida os dados.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A visibilidade deve respeitar o escopo.
- A telemetria deve ser auditavel.

---

# Entidades Envolvidas

## PlatformPerformanceSnapshot

```text
id
metric_name
metric_value
captured_at
```

---

# Testes

- Monitorar performance valida.
- Bloquear escopo sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso fecha a camada de observabilidade operacional da plataforma.
