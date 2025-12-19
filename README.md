# 🧩 Desafio Técnico – Jungle Gaming
---

## 🏗 Arquitetura do Sistema


        ```text
                                [ CLIENT - React ]
                                 /      ^       \
                          (HTTP) /       | (WS)  \ (HTTP)
                                v        |        v
                         [ API GATEWAY ] |  [ NOTIFICATIONS SERVICE ]
                         /      |        |          ^
               (RPC)    /       | (RPC)  |          |
              /________/        |        |          | (Consume)
             v                  v        |          |
      [ AUTH SERVICE ]   [ TASKS SERVICE ] <--- [ RABBITMQ ]
             |           (Publish Event) |          ^
             |                  |        |          | (Publish)
      [ Schema: auth ]   [ Schema: tasks ]|----------|
             \__________________________|/
                        |
                 [ POSTGRES DB ]
´´´
---
## 🛠 Problemas conhecidos e o que melhoraria
Não tive nenhum problema significativo, apesar de ter aprendido nest.js de verdade nesses ultimos dias, gostei da combinação do typeorm, rabbitmq e nest, mudaria
as stacks de estilo, não sou muito fã de css-inline, acredito que deixa o codigo de certa maneira "sujo", mas admito que é "pratico".
Particularmente gosto de deixar o codigo organizado por mais que fique com mais arquivos e linhas, um sass com css.modules já é interessante, mas o styled-components tem seu lugarzinho no meu coração

## 🛠 Tempo gasto
Apesar de ter perdido praticamente uma semana por outros motivos, oque mais me tomou tempo foi o back-end aonde gastei cerca de 5 dias, entre estudo e execução, fiz 
3 projetos de nest.js antes de iniciar o desafio, ja o front-end só sobrou 1 dia e meio para usar e conseguiria avançar mais com o mesmo tempo, porém nunca tinha usado
o Tanstack Router

## 🚀 Instruções específicas 

O projeto não está totalmente dockerizado então vamos ter que rodar alguns comandos e retirar o .exemple do env em auth-service e api-gateway

---
Primeiro vamos instalar as dependencias:

```bash
yarn install
```
Depois rodar os container:

```bash
docker compose up --build
```
Depois rodar o turborepo:

```bash
yarn run dev:all
```

# Considerações finais
Gostei muito de fazer o desafio, apesar de não ter conseguido finalizar o desafio, achei muito interessante a escolha de tecnologias que são relativamente
simples, mas muito funcional, acompanhe meu perfil no linkedin que posto a versão completa da qui a uns dias.
No final do dia o app só ta com a api funcional o front só tem login/registro e listagem de tarefas
Após começar a desenvolver o front percebi que só a adição de tarefas e comentarios ficaria  muito simples então a ideia é adicionar uma organização de projetos 
para agrupar as tarefas e a possibilidade da criação de times também, assim facilitaria a escolha de um grupo especifico para cada tarefa,também quero adicionar um modal de perfil para o usuario cadastrar mais informações, drag em drop nas tarefas e um chatbot para adicionar manipular as tarefas e times, recentemente fiz um projeto com chatbot que gerenciava um simples todolist e acho que a ideia ficaria perfeita para completar o projeto.
Bom como comentei a versão final vai ficar disponivel em alguns dias caso termine a tempo de verem, o link vai estar a baixo


