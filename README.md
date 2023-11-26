# Sistema de Criação de Lembretes

Este é um sistema para criar lembretes seguindo a ideia apresentada no teste prático da dti digital.
![projeto](https://github.com/AlexiaCordeiro/teste-dti/assets/84211729/2e9a1bfb-9497-4fd9-ad64-98e7abab43cc)
## Tecnologias Utilizadas

- **Back-end em Javascript:** O projeto foi desenvolvido utilizando JavaScript como linguagem de back-end.
- **Node.js e Express:** Foram utilizados Node.js e o framework Express para criar o servidor e as rotas da aplicação.
- **SQLite como banco de dados:** Escolhi o banco de dados SQLite devido à sua simplicidade e,**principalmente** , portabilidade.
- **Testes Unitários:** Criei testes unitários utilizando Jest para garantir a integridade das funcionalidades principais.
- **Nodemon:** Utilizei o Nodemon para reiniciar automaticamente o servidor sempre que houver alterações no código.

## Premissas assumidas
1. Armazenamento de dados: Os lembretes são salvos em um banco de dados para que possa utilizar melhor os conceitos de Rest API.
2. Login: Estou assumindo que não é necessária a criação de contas para acessar o banco de dados.
3. Edição de tarfas: Estou assumindo que é necessário a edição de tarefas para facilitar a utilização da aplicação.
4. Hosting do site: Assumi que não é necessário fazer o hosting da aplicação e que rodar pelo terminal seria o suficiente.
5. Limite de tempo: Só é possível inserir ou editar uma tarefa, se for até 5 anos a mais do que o ano atual.

## Decisões de projeto
1. Uso de Node.js e Express: para a facilitação do uso de javascript no projeto.
2. Uso do SQLite: devido a sua facilidade de portabilidade.
3. Criação de filtro de tarefas: para facilitar a visualização e o encontro de tarefas.
4. Jest para testes: escolhido por ser um framework de testes de fácil utilização e ter uma curva de aprendizado relativamente suave.
5. Uso do javascript: escolhida essa linguagem de programação, pois foi a recomendada no pdf do teste que me enviaram.

## Instalação

Antes de executar o projeto, certifique-se de ter o Node.js instalado em sua máquina.
1. **Link para instalação do npm: https://nodejs.org/en/download**
2. **Clone este repositório e entre na pasta:**

    ```bash
    git clone https://github.com/AlexiaCordeiro/teste-dti.git
    cd teste-dti
    ```

2. **Instale as dependências:**

    ```bash
    npm install jest supertest nodemon express sqlite3
    ```

## Executando o Projeto

Certifique-se de ter o banco de dados SQLite instalado. O arquivo do banco de dados (`db.sqlite`) será criado automaticamente quando o projeto for executado pela primeira vez.

Para iniciar o servidor e executar a aplicação, utilize o seguinte comando:

```bash
npm run start
```
Ele é acessado pelo link: http://localhost:8000/

Para rodar os testes, faça:

```bash
npm run test
```
