const db = require('../src/api/database.js');

// Mock do banco de dados SQLite
jest.mock('../src/api/database.js', () => {
  const dbMock = {
    run: jest.fn(), 
  };

  return jest.fn(() => dbMock); 
});

describe('SQLite Database Tests', () => {
  // Testa se o banco de dados está conectado
  it('should connect to the SQLite database', async () => {
    expect(db).toBeDefined();
   
  });

  // Testa se a tabela 'tasks' é criada
  it('should create the tasks table', async () => {
    const tasksTable = db(); 

    // Simula a criação da tabela mockando o método 'run'
    tasksTable.run.mockImplementation((query, callback) => {
      if (query.includes('CREATE TABLE IF NOT EXISTS tasks')) {
        
        callback(null);
      } else {
        
        callback(new Error('Invalid query'));
      }
    });

  });

  // Testa a inserção de uma nova tarefa no banco de dados
  it('should insert a new task into the database', async () => {
   
    const tasksTable = db();

    // Simula a inserção de uma tarefa mockando o método 'run'
    tasksTable.run.mockImplementation((query, params, callback) => {
      if (query.includes('INSERT INTO tasks')) {
        
        callback(null);
      } else {
        
        callback(new Error('Invalid query'));
      }
    });

  });

  // Testa a atualização de uma tarefa no banco de dados
  it('should update a task in the database', async () => {
    
    const tasksTable = db();

    
    tasksTable.run.mockImplementation((query, params, callback) => {
      if (query.includes('UPDATE tasks')) {
        
        callback(null);
      } else {
        
        callback(new Error('Invalid query'));
      }
    });

  });

  // Testa a exclusão de uma tarefa do banco de dados
  it('should delete a task from the database', async () => {
    
    const tasksTable = db();

    tasksTable.run.mockImplementation((query, params, callback) => {
      if (query.includes('DELETE FROM tasks')) {
        
        callback(null);
      } else {
        
        callback(new Error('Invalid query'));
      }
    });

  });

});
