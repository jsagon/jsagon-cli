## JSagon CLI - JSagon Framework

A JSagon CLI tem como propósito fornecer um meio de criação rápido e fácil. A instalação e a criação de um novo projeto é muito simples com a cli em questão. Sendo necessário apenas executar os seguintes comandos no terminal de sua preferência. 

Para instalar o CLI, execute o comando a seguir:
```bash
npm i -g @jsagon/cli
```
Para criar um novo projeto, escolha o diretório de sua preferência, e execute o seguinte comando:
```bash
jsagon new nome-do-projeto
```

Ao rodar o comando anterior, algumas perguntas serão feitas, responda-as de acordo com a sua preferência.

Sendo elas até o momento essencialmente:
- Qual linguagem utilizar? TypeScript ou JavaScript.
- Qual View Engine utilizar? Handlebars ou EJS. Obs.: caso não tenha conhecimento sobre View Engine, não tenha receio, é bem simples.
- Qual gerenciador de pacote utilizar para instalar as dependências? Npm, Yarn ou Manual. Obs.: é normal ocorrer uma demora na instalação devido a determinadas opções escolhidas e suas dependências.

A criação do projeto tendo sido finalizada com sucesso, terá criado uma pasta com o nome do projeto escolhido e toda a estrutura padrão da framework.

Para mais informação, ver [documentação](https://jsagon.com/jsagon-nodejs-framework).