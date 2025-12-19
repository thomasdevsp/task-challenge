# 🧩 Desafio Técnico – Jungle Gaming
---

## 🏗 Arquitetura do Sistema

                            [ CLIENT - React ]
                             /      ^       \
                      (HTTP) /       |       \ (HTTP)
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

---
## 🛠 Problemas conhecidos e o que melhoraria
Não tive nenhum problema significativo, apesar de ter aprendido nest.js de verdade nesses ultimos dias, gostei da combinação do typeorm, rabbitmq e nest, mudaria
as stacks de estilo, não sou muito fã de css-inline, acredito que deixa o codigo de certa maneira "sujo", mas admito que é "pratico"

## 🛠 Tempo gasto
Apesar de ter perdido praticamente uma semana por outros motivos, oque mais me tomou tempo foi o back-end aonde gastei cerca de 5 dias, entre estudo e execução, fiz 
3 projetos de nest.js antes de iniciar o desafio, ja o front-end só sobrou 1 dia e meio para usar e conseguiria avançar mais com o mesmo tempo, porém nunca tinha usado
o Tanstack Router

## 🚀 Instruções específicas se houver

O projeto não está totalmente dockerizado então vamos ter que rodar alguns comandos

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
simples, mas muito funcional, acompanhe meu perfil no linkedin que posto a versão completa da qui a uns dias
