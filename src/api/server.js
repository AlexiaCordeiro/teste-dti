const express = require("express");
const bodyParser = require("body-parser");
const tasksRoutes = require('../api/routes/routes.js');
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas de tarefas
app.use('/api/tasks', tasksRoutes);

// Rota para o arquivo de script
app.get('/scripts/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'scripts', 'script.js'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta do servidor
const HTTP_PORT = 8000;
const server = app.listen(HTTP_PORT, () => {
    console.log("Servidor rodando na porta %PORT%".replace("%PORT%", HTTP_PORT));
});

module.exports = { app, server };
