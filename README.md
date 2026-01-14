# Libraskê Web
> Aplicação web que autentica usuários e realiza a execução do jogo Libraskê, desenvolvido com a Unity Engine.

![vlibras-image]

<hr>

## Conteúdos

- [Instalação](#instalação)
- [Executando](#executando)
- [Documentação](#documentação)
- [Contribuintes](#contribuintes)


<hr>

## Arquitetura Libraskê

![arq-libraske]

<hr>

## Instalação

#### 1 - Clonar o repositório  
`git clone https://gitlab.lavid.ufpb.br/vlibras2019/librask-2021/libraske-web.git`

#### 2 - Instalar [NodeJs](https://nodejs.org/en/)  

#### 3 - Instalar [Yarn](https://yarnpkg.com/)

`npm install -g yarn`  

#### 4 - Instalar dependências do projeto  
`yarn` 

<hr>

## Executando

`yarn start`


<hr>

## Documentação

A documentação está incluída no código, com anotações em formato JSDoc.
Também é possível visualizar a documentação completa ao abrir o arquivo `docs/global.html` em qualquer navegador.

Sempre que houver mudanças nos comentários ou no código, a documentação
pode ser regenerada automaticamente com:

`yarn docs`

Esse comando gera novamente os arquivos HTML dentro da pasta docs/,
mantendo a documentação sincronizada com o código-fonte.

<hr>

## Contribuintes


- Arnor Neto – arnor.neto@lavid.ufpb.br
- Caio Victor - caio.victor@lavid.ufpb.br

<hr>

<!-- Markdown link & img dfn's -->
[vlibras-image]: https://www.gov.br/governodigital/pt-br/vlibras/vlibras/@@govbr.institucional.banner/e070e146-e2bd-4754-8c55-36100391d1a6/@@images/f77e1435-97aa-4c8e-9f9f-6a42cc82f39a.png
[arq-libraske]: https://gitlab.lavid.ufpb.br/vlibras2019/librask-2021/libraske-api/-/raw/master/doc/img/model.png
