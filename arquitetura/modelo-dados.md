
# Modelo Conceitual

Pessoa 1:N VinculoTrabalhista

Empresa 1:N VinculoTrabalhista

Cargo 1:N VinculoTrabalhista

Departamento 1:N VinculoTrabalhista

Pessoa 1:N Documento

VinculoTrabalhista 1:N Movimentacao

VinculoTrabalhista 1:N EventoESocial

## Princípios

- Pessoa nunca é excluída fisicamente.
- Histórico é imutável.
- Eventos são auditáveis.
- Todo registro pertence a uma empresa.
