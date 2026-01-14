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

### Variáveis de Ambiente

As seguintes variáveis são utilizadas pela aplicação para configuração de autenticação e integração com serviços externos:

| Variável                    | Descrição                                                                 |
|-----------------------------|---------------------------------------------------------------------------|
| `REACT_APP_LOGIN_UNICO`     | URL base do serviço de autenticação (Login Único).                       |
| `REACT_APP_CLIENT_ID`       | Identificador da aplicação no provedor de autenticação.                  |
| `REACT_APP_CLIENT_SECRET`  | Chave secreta da aplicação no provedor de autenticação.                  |
| `REACT_APP_REDIRECT_URI`    | URL de retorno após o processo de autenticação.                          |
| `REACT_APP_ACCESS_SECRET`  | Segredo usado para validação/decodificação do token de acesso.           |
| `REACT_APP_REFRESH_SECRET` | Segredo usado para validação/decodificação do token de atualização.      |
| `REACT_APP_LOGOUT_URI`      | URL para redirecionamento após o logout do usuário.                      |

Em desenvolvimento, os valores são lidos a partir do arquivo `.env`, seguindo o
padrão do React (`REACT_APP_*`). O repositório inclui um `.env.example` como
referência para configuração local.

Em produção, essas variáveis são injetadas em runtime via `config.js`
(`window.__ENV__`). Esse arquivo é gerado no startup do container pelo
`ENTRYPOINT`, que executa o script `gen-config.sh`.

<hr>

## Contribuintes


- Arnor Neto – arnor.neto@lavid.ufpb.br
- Caio Victor - caio.victor@lavid.ufpb.br

<hr>

<!-- Markdown link & img dfn's -->
[vlibras-image]: https://www.gov.br/governodigital/pt-br/vlibras/vlibras/@@govbr.institucional.banner/e070e146-e2bd-4754-8c55-36100391d1a6/@@images/f77e1435-97aa-4c8e-9f9f-6a42cc82f39a.png
[arq-libraske]: https://gitlab.lavid.ufpb.br/vlibras2019/librask-2021/libraske-api/-/raw/master/doc/img/model.png
