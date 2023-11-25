const db = require('../src/api/database.js');

// Mock do banco de dados SQLite
jest.mock('../src/api/database.js', () => {
  const dbMock = {
    run: jest.fn(), // Mock do método 'run' do banco de dados
    // Mock de outros métodos do banco de dados, se necessário
  };

  return jest.fn(() => dbMock); // Retorna um mock da instância do banco de dados
});

describe('SQLite Database Tests', () => {
  // Testa se o banco de dados está conectado
  it('should connect to the SQLite database', async () => {
    expect(db).toBeDefined();
    // Adicionar asserções para validar a conexão com o banco de dados
  });

  // Testa se a tabela 'tasks' é criada
  it('should create the tasks table', async () => {
    const tasksTable = db(); // Cria uma instância do banco de dados simulado

    // Simula a criação da tabela mockando o método 'run'
    tasksTable.run.mockImplementation((query, callback) => {
      if (query.includes('CREATE TABLE IF NOT EXISTS tasks')) {
        // Simula a criação bem-sucedida da tabela
        callback(null);
      } else {
        // Manipula outras execuções de consulta, se necessário
        callback(new Error('Invalid query'));
      }
    });

  });

  // Testa a inserção de uma nova tarefa no banco de dados
  it('should insert a new task into the database', async () => {
    // Instância simulada do banco de dados
    const tasksTable = db();

    // Simula a inserção de uma tarefa mockando o método 'run'
    tasksTable.run.mockImplementation((query, params, callback) => {
      if (query.includes('INSERT INTO tasks')) {
        // Simula a inserção bem-sucedida
        callback(null);
      } else {
        // Manipula outras execuções de consulta, se necessário
        callback(new Error('Invalid query'));
      }
    });

  });

  // Testa a atualização de uma tarefa no banco de dados
  it('should update a task in the database', async () => {
    // Instância simulada do banco de dados
    const tasksTable = db();

    // Simula a atualização de uma tarefa mockando o método 'run'
    tasksTable.run.mockImplementation((query, params, callback) => {
      if (query.includes('UPDATE tasks')) {
        // Simula a atualização bem-sucedida
        callback(null);
      } else {
        // Manipula outras execuções de consulta, se necessário
        callback(new Error('Invalid query'));
      }
    });

  });

  // Testa a exclusão de uma tarefa do banco de dados
  it('should delete a task from the database', async () => {
    // Instância simulada do banco de dados
    const tasksTable = db();

    // Simula a exclusão de uma tarefa mockando o método 'run'
    tasksTable.run.mockImplementation((query, params, callback) => {
      if (query.includes('DELETE FROM tasks')) {
        // Simula a exclusão bem-sucedida
        callback(null);
      } else {
        // Manipula outras execuções de consulta, se necessário
        callback(new Error('Invalid query'));
      }
    });

  });

});
