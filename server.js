const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const BASE_URL = "https://parallelum.com.br/fipe/api/v1/carros";

// HOME
app.get("/", (req, res) => {
  res.send("API FIPE ONLINE");
});

// LISTAR MARCAS
app.get("/marcas", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/marcas`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar marcas"
    });
  }
});

// LISTAR MODELOS
app.get("/modelos/:marca", async (req, res) => {
  try {
    const { marca } = req.params;

    const response = await axios.get(
      `${BASE_URL}/marcas/${marca}/modelos`
    );

    res.json(response.data.modelos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar modelos"
    });
  }
});

// LISTAR ANOS
app.get("/anos/:marca/:modelo", async (req, res) => {
  try {
    const { marca, modelo } = req.params;

    const response = await axios.get(
      `${BASE_URL}/marcas/${marca}/modelos/${modelo}/anos`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar anos"
    });
  }
});

// CONSULTAR FIPE
app.get("/fipe/:marca/:modelo/:ano", async (req, res) => {
  try {
    const { marca, modelo, ano } = req.params;

    const response = await axios.get(
      `${BASE_URL}/marcas/${marca}/modelos/${modelo}/anos/${ano}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar FIPE"
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
