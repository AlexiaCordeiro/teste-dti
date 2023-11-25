// Mock das importações necessárias e objetos de request/response
const db = require('../src/api/database.js');
jest.mock('../src/api/database.js', () => ({
  all: jest.fn(),
  run: jest.fn(),
}));

// Importação dos controladores e funções para mock de request/response
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../src/api/controllers/controllers.js');

// Função para mock de um objeto de request com possibilidade de sobreposição de propriedades
const mockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  ...overrides,
});

// Função para mock de um objeto de response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

// Testes unitários para o controlador getAllTasks
describe('getAllTasks Controller', () => {
  it('deve obter todas as tarefas com sucesso', async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock da resposta do banco de dados
    const mockedTasks = [
    ];
    db.all.mockImplementation((sql, params, callback) => {
      callback(null, mockedTasks);
    });

    await getAllTasks(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success',
      data: mockedTasks, 
    });
  });
});

// Testes unitários para o controlador createTask
describe("createTask Controller", () => {
  it("should create a new task successfully", async () => {
    const req = {
      body: {
        todo: "Sample task", 
        date: "2023-11-30", 
        done: 0, 
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn().mockReturnThis(), 
    };

    // Mock da resposta do banco de dados para a função createTask
    db.run.mockImplementation((sql, params, callback) => {
      callback(null, { lastID: 1 }); 
    });

    await createTask(req, res); 

    // Asserts para verificar se o response foi enviado corretamente
    expect(res.status).toHaveBeenCalledWith(201); 
    expect(res.json).toHaveBeenCalledWith({
      message: "success", 
      data: req.body, 
      id: undefined, 
    });

  });
});

// Testes unitários para o controlador updateTask
describe("updateTask Controller", () => {
  it("should update an existing task successfully", async () => {
    const req = {
      params: {
        id: 1,
      },
      body: {
        todo: "Updated task",
        date: "2023-12-01",
        done: 1, 
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock da resposta do banco de dados para a função updateTask
    db.run.mockImplementation((sql, params, callback) => {
      callback(null, { changes: 1 });
    });

    await updateTask(req, res); 

    // Assert para verificar se o response foi enviado corretamente após a atualização
    expect(res.json).toHaveBeenCalledWith({
      message: "success",
      data: req.body, 
      changes: undefined, 
    });
    
  });
});

// Testes unitários para o controlador deleteTask
describe("deleteTask Controller", () => {
  it("should delete an existing task successfully", async () => {
    const req = {
      params: {
        id: 1, // ID da tarefa a ser deletada
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn().mockReturnThis(), 
    };

    // Mock da resposta do banco de dados para a função deleteTask
    db.run.mockImplementation((sql, params, callback) => {
      callback(null, { changes: 1 });
    });

    await deleteTask(req, res);

    // Assert para verificar se o response foi enviado corretamente após a exclusão
    expect(res.json).toHaveBeenCalledWith({
      message: "deleted", 
      changes: undefined,
    });
  });
});
