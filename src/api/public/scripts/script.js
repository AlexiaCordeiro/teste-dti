// Função auxiliar para converter uma string de data em um objeto Date
function convertToDateObject(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}

// Função para fazer chamadas à API
function handleAPICall(endpoint, method, body, successCallback, errorCallback) {
    // Faz uma requisição fetch para o endpoint da API
    fetch(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(successCallback)
    .catch(errorCallback);
}

// Função para exibir as tarefas na página
function displayTasks(tasks) {
    // Obtém a lista de tarefas do elemento com ID 'taskList'
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Agrupa as tarefas por data
    const groupedTasks = groupTasksByDate(tasks);

    // Ordena as datas
    const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
        const dateA = convertToDateObject(a); // Converte a string de data em objeto Date
        const dateB = convertToDateObject(b); // Converte a string de data em objeto Date
        return dateA - dateB;
    });

    // Para cada data ordenada, exibe as tarefas correspondentes
    sortedDates.forEach(date => {
        const dateHeader = document.createElement('h2');
        dateHeader.textContent = date;
        taskList.appendChild(dateHeader);

        const tasksForDate = groupedTasks[date];
        
        // Ordena as tarefas para esta data por data
        tasksForDate.sort((a, b) => {
            const dateA = convertToDateObject(a.date); // Converte a string de data em objeto Date
            const dateB = convertToDateObject(b.date); // Converte a string de data em objeto Date
            return dateA - dateB;
        });

        // Para cada tarefa nesta data, cria um item na lista de tarefas
        tasksForDate.forEach(task => {
            const taskItem = document.createElement('div');
            const isTaskDoneClass = task.done ? 'task-done' : ''; // Adiciona uma classe se a tarefa estiver concluída
            
            taskItem.innerHTML = `
                <div class="task-displayer">
                    <label>
                        <input type="checkbox" id="task_${task.id}" name="task_${task.id}" ${(task.done ? 'checked' : '')} /> 
                        <span class="${isTaskDoneClass}">${task.todo}</span>
                    </label>
                    <div class="task-actions">
                        <div class="button-container">
                            <button class="edit-icon" title="Editar">&#9998;</button>
                            <button class="delete-btn" data-task-id="${task.id}">x</button>
                        </div>
                    </div>
                </div>
            `;
            const checkbox = taskItem.querySelector(`#task_${task.id}`);
            checkbox.addEventListener('change', () => {
                updateTaskStatus(task.id, checkbox.checked);
                const taskText = taskItem.querySelector('span'); // Seleciona o elemento span dentro do item de tarefa
                taskText.classList.toggle('task-done', checkbox.checked); // Adiciona ou remove a classe 'task-done' baseada no estado do checkbox
            });
        

            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                deleteTask(task.id);
            });

            const editBtn = taskItem.querySelector('.edit-icon');
            editBtn.addEventListener('click', () => openEditModal(task)); // Adiciona um evento de clique para abrir o modal

            taskList.appendChild(taskItem);
        });
    });
    function openEditModal(task) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
    
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
    
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Novo nome:';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = task.todo;
    
        const dateLabel = document.createElement('label');
        dateLabel.textContent = 'Nova data:';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        
        // Conversão da data para o formato 'yyyy-mm-dd'
        const [day, month, year] = task.date.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        dateInput.value = formattedDate;
    
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Salvar';
        saveBtn.classList.add('save-button');
        saveBtn.addEventListener('click', () => {
            const updatedTodo = nameInput.value;
            const updatedDate = dateInput.value;
    
            // Faça a chamada à API para atualizar a tarefa com os novos valores
            updateTask(task.id, { todo: updatedTodo, date: updatedDate });
    
            modal.remove(); // Fecha o modal após salvar
        });
    
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cancelar';
        closeBtn.classList.add('cancel-button');
        closeBtn.addEventListener('click', () => {
            modal.remove(); // Fecha o modal ao cancelar
        });
    
        modalContent.appendChild(nameLabel);
        modalContent.appendChild(nameInput);
        modalContent.appendChild(dateLabel);
        modalContent.appendChild(dateInput);
        modalContent.appendChild(saveBtn);
        modalContent.appendChild(closeBtn);
    
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
    
      
    // Esconde ou exibe o título 'Tarefas' com base na existência de tarefas
    const headingTarefas = document.querySelector('.classTitle');
    if (tasks.length === 0) {
        headingTarefas.style.display = 'none';
    } else {
        headingTarefas.style.display = 'block';
    }
}

// Constante para armazenar o endpoint da API de tarefas
const TASKS_API_ENDPOINT = '/api/tasks';

// Event listener para o formulário de tarefas (submissão)
document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtém os valores do formulário
    const todo = document.getElementById('todo').value;
    const date = document.getElementById('date').value;

    // Cria objetos Date para a data atual e a data selecionada
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Define para o início do dia

    const selectedDate = new Date(date);
    selectedDate.setHours(23, 59, 59, 0); // Define para o fim do dia

    // Verifica se a data selecionada é no futuro, exibe um alerta se não for
    if (selectedDate.getTime() < currentDate.getTime()) {
        alert("A data deve ser no futuro. Por favor, selecione outra data.");
        return;
    }
    if (selectedDate.getFullYear() > currentDate.getFullYear() + 10){
        alert("A data deve estar dentro de 10 anos. Por favor, selecione outra data.");
        return;
    }

    // Faz uma chamada à API para adicionar a nova tarefa
    handleAPICall(
        '/api/tasks',
        'POST',
        { todo, date },
        data => {
            fetchAndDisplayTasks(); // Atualiza e exibe as tarefas após adicionar
            document.getElementById('todo').value = '';
            document.getElementById('date').value = '';
        },
        error => {
            console.error('Error:', error);
        }
    );
});

// Função para buscar e exibir as tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchAndDisplayTasks);

// Função para buscar e exibir as tarefas
function fetchAndDisplayTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(data => {
            displayTasks(data.data); // Exibe as tarefas recebidas da API
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}

// Função para agrupar tarefas por data
function groupTasksByDate(tasks) {
    const grouped = tasks.reduce((groupedTasks, task) => {
        const date = task.date;
        if (!groupedTasks[date]) {
            groupedTasks[date] = [];
        }
        groupedTasks[date].push(task);
        return groupedTasks;
    }, {});

    // Obtém a lista ordenada de datas
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

    // Cria um novo objeto com as datas ordenadas
    const sortedGroupedTasks = {};
    sortedDates.forEach(date => {
        sortedGroupedTasks[date] = grouped[date];
    });

    return sortedGroupedTasks;
}

function updateTask(taskId, newData) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(data => {
        fetchAndDisplayTasks(); // Atualiza e exibe as tarefas após atualizar
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Função para atualizar o status de uma tarefa
function updateTaskStatus(taskId, isChecked) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: isChecked })
    })
    .then(response => response.json())
    .then(data => {
        fetchAndDisplayTasks(); // Atualiza e exibe as tarefas após marcar como feita
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Função para deletar uma tarefa
function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            fetchAndDisplayTasks(); // Atualiza e exibe as tarefas após deletar
        } else {
            throw new Error('Failed to delete task');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
