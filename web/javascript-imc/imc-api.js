const http = require("http");

const PORT = process.env.PORT || 3000;

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function obterCategoria(imc) {
  if (imc < 18.5) return "Magreza";
  if (imc <= 24.9) return "Normal";
  if (imc <= 30) return "Sobrepeso";
  return "Obesidade";
}

function obterFaixaCategoria(categoria) {
  if (categoria === "Magreza") return "< 18,5 kg/m2";
  if (categoria === "Normal") return "entre 18,5 e 24,9 kg/m2";
  if (categoria === "Sobrepeso") return "entre 24,9 e 30 kg/m2";
  return "> 30 kg/m2";
}

function validarEntrada(peso, altura) {
  if (!Number.isFinite(peso) || !Number.isFinite(altura)) {
    return "Peso e altura devem ser numeros validos.";
  }

  if (peso <= 0 || altura <= 0) {
    return "Peso e altura devem ser maiores que zero.";
  }

  if (altura > 3) {
    return "Altura deve ser informada em metros (ex: 1.75).";
  }

  return null;
}

function enviarJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function calcularResultado(peso, altura) {
  const imc = calcularIMC(peso, altura);
  const imcArredondado = Number(imc.toFixed(2));
  const categoria = obterCategoria(imcArredondado);
  return {
    peso,
    altura,
    imc: imcArredondado,
    categoria,
    faixaCategoria: obterFaixaCategoria(categoria),
    formula: "IMC = Peso / Altura²"
  };
}

function gerarCenarios() {
  const exemplos = [
    { descricao: "Magreza (abaixo de 18,5)", peso: 50, altura: 1.8 },
    { descricao: "Normal (limite inferior 18,5)", peso: 53.65, altura: 1.7 },
    { descricao: "Normal (limite superior 24,9)", peso: 71.96, altura: 1.7 },
    { descricao: "Sobrepeso (limite 30)", peso: 86.7, altura: 1.7 },
    { descricao: "Obesidade (> 30)", peso: 87, altura: 1.7 }
  ];

  return exemplos.map((item) => ({
    descricao: item.descricao,
    ...calcularResultado(item.peso, item.altura)
  }));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/") {
    return enviarJson(res, 200, {
      mensagem: "API de calculo de IMC",
      formula: "IMC = Peso / Altura²",
      endpoints: {
        calcularGet: "GET /api/imc?peso=70&altura=1.75",
        calcularPost: "POST /api/imc com JSON { peso, altura }",
        cenarios: "GET /api/imc/cenarios"
      }
    });
  }

  if (req.method === "GET" && url.pathname === "/api/imc") {
    const peso = Number(url.searchParams.get("peso"));
    const altura = Number(url.searchParams.get("altura"));

    const erro = validarEntrada(peso, altura);
    if (erro) {
      return enviarJson(res, 400, { erro });
    }

    return enviarJson(res, 200, calcularResultado(peso, altura));
  }

  if (req.method === "GET" && url.pathname === "/api/imc/cenarios") {
    return enviarJson(res, 200, {
      cenarios: gerarCenarios()
    });
  }

  if (req.method === "POST" && url.pathname === "/api/imc") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let data;
      try {
        data = JSON.parse(body || "{}");
      } catch (error) {
        return enviarJson(res, 400, { erro: "JSON invalido no corpo da requisicao." });
      }

      const peso = Number(data.peso);
      const altura = Number(data.altura);

      const erro = validarEntrada(peso, altura);
      if (erro) {
        return enviarJson(res, 400, { erro });
      }

      return enviarJson(res, 200, calcularResultado(peso, altura));
    });

    return;
  }

  return enviarJson(res, 404, { erro: "Rota nao encontrada." });
});

server.listen(PORT, () => {
  console.log(`Servidor IMC rodando em http://localhost:${PORT}`);
});
