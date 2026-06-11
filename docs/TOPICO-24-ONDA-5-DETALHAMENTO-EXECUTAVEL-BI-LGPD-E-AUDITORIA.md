# Sistema de RH para o Mercado Brasileiro

# Topico 24 - Onda 5: Detalhamento Executavel de BI, LGPD e Auditoria

## Objetivo

Transformar a Onda 5 do pos-MVP em frentes concretas de analitica, privacidade e auditoria ampliada.

---

## Frentes executaveis

### 1. BI agregado

- manter indicadores agregados e minimizados;
- separar consultas operacionais de analiticas;
- evitar exposicao de dados pessoais quando desnecessario;
- registrar origem e recorte dos dados.

### 2. Exportacoes autorizadas

- aplicar formato e finalidade permitidos;
- manter mascaramento por nivel;
- registrar quem exportou, quando e por que;
- separar exportacao operacional de auditoria.

### 3. Mascaramento

- aplicar `strict`, `controlled` e `aggregate` conforme o caso;
- registrar excecoes e justificativas;
- manter coerencia entre tela, exportacao e auditoria;
- evitar mascaramento improvisado por interface.

### 4. Auditoria ampliada

- reforcar consulta, exportacao e alteracao sensivel;
- registrar motivo, origem e escopo;
- manter trilha util para analise posterior;
- separar evento de negocio e evento de acesso.

### 5. Retencao por classe

- manter politica por classe de dado e finalidade;
- registrar excecoes legais e contratuais;
- evitar prazo unico artificial;
- sincronizar com descarte e legal hold.

---

## Sequencia recomendada

1. BI agregado;
2. exportacoes autorizadas;
3. mascaramento;
4. auditoria ampliada;
5. retencao por classe.

---

## Dependencias

- Onda 5 formalizada no Topico 18;
- backlog pos-MVP consolidado no Topico 13;
- politica base de LGPD ja definida;
- Onda 1, Onda 2, Onda 3 e Onda 4 formalizadas.

---

## Criterios de aceite

- a analitica precisa operar sem exposicao desnecessaria;
- exportacoes precisam respeitar finalidade e rastreio;
- o mascaramento deve ser previsivel e auditavel;
- a retencao precisa continuar consistente com base legal.

---

## Resultado esperado

Ao final deste detalhamento, a Onda 5 deve estar pronta para ampliar BI e governanca sem comprometer privacidade ou rastreabilidade.
