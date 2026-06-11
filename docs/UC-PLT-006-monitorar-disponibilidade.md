# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-PLT-006 - Monitorar Disponibilidade

### Versao

1.0

---

# Objetivo

Monitorar a disponibilidade da plataforma e dos servicos criticos.

---

# Atores

- Gestor de Plataforma
- Administrador do Sistema

---

# Pre-condicoes

- Servicos ativos.
- Usuario autenticado.

---

# Gatilho

O processo inicia quando a disponibilidade precisa ser verificada.

---

# Fluxo Principal

1. Usuario acessa Plataforma > Disponibilidade.
2. Sistema apresenta o estado dos servicos.
3. Usuario filtra por componente.
4. Sistema consolida o status.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- O monitoramento deve ser auditavel.
- O estado deve refletir a realidade operacional.

---

# Entidades Envolvidas

## PlatformAvailabilitySnapshot

```text
id
component
status
captured_at
```

---

# Testes

- Monitorar componente valido.
- Bloquear escopo sem permissao.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso abre a camada operacional da plataforma apos a configuracao estrutural.
