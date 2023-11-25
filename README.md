# Sistema de Criação de Lembretes

Este é um sistema para criar lembretes seguindo a ideia apresentada no teste prático da dti digital.
![projeto](https://github.com/AlexiaCordeiro/teste-dti/assets/84211729/0b8d7e99-9c3d-40af-896d-d569384eb352)
## Tecnologias Utilizadas

- **Back-end em Javascript:** O projeto foi desenvolvido utilizando JavaScript como linguagem de back-end.
- **Node.js e Express:** Foram utilizados Node.js e o framework Express para criar o servidor e as rotas da aplicação.
- **SQLite como banco de dados:** Escolhi o banco de dados SQLite devido à sua simplicidade e,**principalmente** , portabilidade.
- **Testes Unitários:** Criei testes unitários utilizando Jest para garantir a integridade das funcionalidades principais.
- **Nodemon:** Utilizei o Nodemon para reiniciar automaticamente o servidor sempre que houver alterações no código.
## Instalação

Antes de executar o projeto, certifique-se de ter o Node.js instalado em sua máquina.

1. **Clone este repositório e entre na pasta:**

    ```bash
    git clone https://github.com/AlexiaCordeiro/teste-dti.git
    cd teste-dti
    ```

2. **Instale as dependências:**

    ```bash
    npm install jest supertest nodemon express sqlite3 md5
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
