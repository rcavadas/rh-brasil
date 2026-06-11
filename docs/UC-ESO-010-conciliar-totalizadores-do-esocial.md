# Sistema de RH para o Mercado Brasileiro

# Caso de Uso

## UC-ESO-010 - Conciliar Totalizadores do eSocial

### Versao

1.0

---

# Objetivo

Conciliar totalizadores e divergencias entre o ambiente local e o retorno do eSocial.

---

# Atores

- Analista de Folha
- Analista de RH
- Administrador do Sistema

---

# Pre-condicoes

- Eventos transmitidos.
- Retornos disponiveis.

---

# Gatilho

O processo inicia quando os totalizadores precisam ser conciliados.

---

# Fluxo Principal

1. Usuario acessa eSocial > Conciliacao.
2. Sistema apresenta divergencias.
3. Usuario analisa o retorno.
4. Sistema consolida o resultado.
5. Sistema registra auditoria.

---

# Regras de Negocio Relacionadas

- A conciliacao deve preservar historico.
- Divergencias devem ser rastreaveis.

---

# Entidades Envolvidas

## EsocialReconciliationSnapshot

```text
id
event_code
status
captured_at
```

---

# Testes

- Conciliar retorno valido.
- Bloquear sem eventos.

---

# Sequenciamento no Catalogo Mestre

Este caso de uso encerra o pacote ao confrontar o retorno do governo com o estado local.

---

# Estado de Implementacao

O runtime executavel atual possui transmissao minima, reprocessamento e trilha de auditoria, entao a conciliacao deve ser a camada que detecta divergencias sem quebrar o historico local.
