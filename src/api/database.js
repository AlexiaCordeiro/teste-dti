const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';
let db = null;

if (process.env.NODE_ENV !== 'test') {
  const connectionMessage = 'Conectado ao banco de dados SQLite';
  db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      throw err;
    } else {
      console.log(connectionMessage);
      db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT,
        done BOOLEAN DEFAULT 0,
        date TEXT
      )`, (err) => {
        if (err) {
          console.error('Erro ao criar a tabela:', err.message);

        } else {
          console.log('Tabela criada com sucesso.');
        }
      });
    }
  });
} else {
  db = new sqlite3.Database(DBSOURCE);
}

module.exports = db;
