const request = require('supertest');
const { app ,server} = require('../src/api/server.js'); 

describe('Test API endpoints', () => {
  afterAll((done) => {
    server.close(done); 
  });

  it('should respond with status 200 for GET /api/tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with status 200 for GET /scripts/script.js', async () => {
    const response = await request(app).get('/scripts/script.js');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with status 200 for GET non-existing route', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with status 201 for POST /api/tasks', async () => {
    const newTask = { todo: 'New Task', date: '2023-12-01' }; 
    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);

    expect(response.statusCode).toBe(201);
  });

  it('should respond with status 200 for PUT /api/tasks/:id', async () => {
    const taskIdToUpdate = 1; // Replace with an existing task ID
    const updatedTaskData = { todo: 'Updated Task', date: '2023-12-02' }; 

    const response = await request(app)
      .put(`/api/tasks/${taskIdToUpdate}`)
      .send(updatedTaskData);

    expect(response.statusCode).toBe(200);
  });

  it('should respond with status 200 for DELETE /api/tasks/:id', async () => {
    const taskIdToDelete = 2; 
    const response = await request(app)
      .delete(`/api/tasks/${taskIdToDelete}`);

    expect(response.statusCode).toBe(200);
    
  });
});
