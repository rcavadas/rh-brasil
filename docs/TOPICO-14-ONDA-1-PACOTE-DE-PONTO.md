# Sistema de RH para o Mercado Brasileiro

# Topico 14 - Onda 1 do Pos-MVP: Pacote de Ponto

## Objetivo

Detalhar a primeira onda executavel do backlog pos-MVP, fechando o pacote de ponto e preparando o fluxo principal para uso consistente no runtime atual.

---

## Escopo

Esta onda cobre os casos de uso UC-JOR-013 a UC-JOR-020:

- calendario de feriados e excecoes;
- regras de tolerancia de ponto;
- dispositivos de ponto;
- comprovante de marcacao;
- adicional noturno;
- DSR e descanso semanal;
- consolidacao de eventos de ponto para folha;
- exportacao de espelho e trilhas de auditoria.

---

## Sequencia de entrega

1. consolidar calendario de feriados e excecoes por empresa e localidade;
2. consolidar tolerancias de ponto por empresa, jornada e perfil;
3. validar e rastrear dispositivos de ponto;
4. padronizar comprovantes de marcacao com mascaramento adequado;
5. fechar adicional noturno com baseline legal e politica versionada;
6. fechar DSR e descanso semanal com politica por configuracao;
7. consolidar eventos de ponto para folha por mapeamento versionado;
8. manter exportacao de espelho e trilhas com mascaramento por finalidade.

---

## Dependencias

- runtime atual validado;
- politica base de LGPD ja definida;
- auditoria relacional ja existente;
- documentos UC-JOR-013 a UC-JOR-020 ja detalhados;
- backlog pos-MVP ja separado do MVP consolidado.

---

## Critérios de aceite da onda

- cada caso de uso da onda precisa permanecer executavel ou especificado com suficiente clareza para implementacao incremental;
- a documentacao precisa refletir a regra realmente adotada;
- riscos e excecoes precisam estar registrados;
- nenhuma regra deve ser tratada como universal sem validacao por empresa, jornada, localidade ou acordo coletivo quando aplicavel.

---

## Resultado esperado

Ao final desta onda, o pacote de ponto deve estar pronto para sustentar o fluxo principal com rastreabilidade, mascaramento e regras operacionais coerentes com o runtime atual.
