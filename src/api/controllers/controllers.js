const db = require("../database.js");

// Função para formatar a data no formato dd/mm/yyyy
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Função para lidar com erros, retornando um JSON com mensagem de erro
function handleErrors(res, err) {
    res.status(400).json({ "error": err.message });
}

// Rota para obter todas as tarefas
exports.getAllTasks = (req, res) => {
    const sql = "SELECT id, todo, done, date FROM tasks";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            handleErrors(res, err); // Manipula o erro, retornando a mensagem de erro
            return;
        }

        rows = rows.map(row => ({
            id: row.id,
            todo: row.todo,
            done: row.done,
            date: formatDate(row.date) // Formata a data no retorno para o formato dd/mm/yyyy
        }));

        res.status(200).json({
            "message": "success",
            "data": rows // Retorna os dados com a mensagem de sucesso
        });
    });
};

// Rota para criar uma nova tarefa
exports.createTask = (req, res, next) => {
    var errors = [];

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") }); // Retorna os erros se houver algum
        return;
    }
    var data = {
        todo: req.body.todo,
        date: req.body.date,
        done: req.body.done || 0 // Valor padrão é 0 (falso) se 'done' não for informado
    };
    var sql = 'INSERT INTO tasks (todo, date, done) VALUES (?,?,?)';
    var params = [data.todo, data.date, data.done];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message }); // Retorna mensagem de erro em caso de falha
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": data,
            "id": this.lastID // Retorna o ID da última inserção com mensagem de sucesso
        });
    });
};

// Rota para atualizar uma tarefa existente
exports.updateTask = (req, res, next) => {
    var data = {
        todo: req.body.todo,
        date: req.body.date,
        done: req.body.done || 0
    };
    db.run(
        `UPDATE tasks 
        SET todo = COALESCE(?, todo), 
            date = COALESCE(?, date), 
            done = COALESCE(?, done) 
        WHERE id = ?`,
        [data.todo, data.date, data.done, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": err.message}); 
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes // Retorna mensagem de sucesso com os dados alterados
            });
    });
};

// Rota para excluir uma tarefa existente
exports.deleteTask = (req, res, next) => {
    db.run(
        'DELETE FROM tasks WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": err.message}); 
                return;
            }
            res.json({"message": "deleted", changes: this.changes}); // Retorna mensagem de sucesso com as alterações
    });
};
