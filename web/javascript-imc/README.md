# API de Calculo de IMC

Projeto backend em Node.js para calcular IMC com a formula:

IMC = Peso / Altura²

## Tecnologias

- Node.js
- Modulo nativo `http` (sem dependencias externas)

## Como executar

1. No terminal, na pasta do projeto, execute:

```bash
npm run start:imc
```

2. A API sobe por padrao em:

- http://localhost:3000

3. Para mudar a porta:

```bash
PORT=3001 node imc-api.js
```

No PowerShell:

```powershell
$env:PORT=3001; node imc-api.js
```

## Rotas implementadas

### GET /

Retorna informacoes basicas da API e lista de endpoints.

### GET /api/imc?peso=70&altura=1.75

Calcula IMC via query string.

- Parametros:
  - `peso` (kg)
  - `altura` (m)

Exemplo de resposta:

```json
{
  "peso": 70,
  "altura": 1.75,
  "imc": 22.86,
  "categoria": "Normal",
  "faixaCategoria": "entre 18,5 e 24,9 kg/m2",
  "formula": "IMC = Peso / Altura²"
}
```

### POST /api/imc

Calcula IMC via JSON no corpo da requisicao.

Body:

```json
{
  "peso": 70,
  "altura": 1.75
}
```

### GET /api/imc/cenarios

Retorna cenarios de demonstracao com exemplos de:

- Magreza
- Normal
- Sobrepeso
- Obesidade

Inclui tambem casos de limite (24,9 e 30).

## Regras de classificacao

- Magreza: IMC < 18,5 kg/m2
- Normal: IMC entre 18,5 e 24,9 kg/m2
- Sobrepeso: IMC entre 24,9 e 30 kg/m2
- Obesidade: IMC > 30 kg/m2

Observacao tecnica:

- A classificacao usa IMC arredondado para 2 casas decimais, evitando erro de ponto flutuante nos limites.

## Faixa de peso por categoria (exemplos por altura)

A relacao usada para converter IMC em peso e:

Peso = IMC x Altura²

### Altura 1,60 m

- Magreza: peso < 47,36 kg
- Normal: 47,36 kg ate 63,74 kg
- Sobrepeso: acima de 63,74 kg ate 76,80 kg
- Obesidade: > 76,80 kg

### Altura 1,70 m

- Magreza: peso < 53,47 kg
- Normal: 53,47 kg ate 71,96 kg
- Sobrepeso: acima de 71,96 kg ate 86,70 kg
- Obesidade: > 86,70 kg

### Altura 1,80 m

- Magreza: peso < 59,94 kg
- Normal: 59,94 kg ate 80,68 kg
- Sobrepeso: acima de 80,68 kg ate 97,20 kg
- Obesidade: > 97,20 kg

## Validacoes da API

- `peso` e `altura` devem ser numeros validos
- `peso` e `altura` devem ser maiores que zero
- `altura` deve ser informada em metros (exemplo: 1.75)

## Arquivos principais

- `imc-api.js`: servidor e regras de negocio do IMC
- `package.json`: scripts do projeto
