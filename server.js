const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API FIPE ONLINE");
});

// Buscar marcas
app.get("/marcas", async (req, res) => {
  try {
    const response = await axios.get(
      "https://parallelum.com.br/fipe/api/v1/carros/marcas"
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar marcas"
    });
  }
});

// Buscar modelos
app.get("/modelos/:marca", async (req, res) => {
  try {
    const marca = req.params.marca;

    const response = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar modelos"
    });
  }
});

// Buscar anos
app.get("/anos/:marca/:modelo", async (req, res) => {
  try {
    const { marca, modelo } = req.params;

    const response = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar anos"
    });
  }
});

// Buscar FIPE final
app.get("/fipe/:marca/:modelo/:ano", async (req, res) => {
  try {
    const { marca, modelo, ano } = req.params;

    const response = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos/${ano}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar FIPE"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});