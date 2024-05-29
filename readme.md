# TESTE BSN - POKEDEX

É um app feito para concorrer a uma vaga de desenvolvedor mobile pela empresa BSN

## Features

- Na página inicial que carrega a lista de pokemons tem:

  - Menu lateral esquerdo
  - Botão que acessa a página de Favoritos
  - Infinite Scroll
    - Ao chegar ao final da lista, haveŕa uma nova chamada à API e novos pokemons serão carregados e adicionados à listagem
  - Refresh da página
    - No topo da tela, ao segurar o dedo na tela e puxar para baixo, a listagem é recarregada
  - Botão de favoritos
    - Para adicionar ou remover da listagem de Favoritos

- Na tela de Favoritos

  - Menu lateral esquerdo
  - Botão de voltar para página anterior
  - Botão de favoritos
    - Para adicionar ou remover da listagem de Favoritos
  - Refresh da página

- Na tela de detalhes de um pokemon

  - Botão de voltar para página anterior
  - Listagem de detalhes de um pokemon

## Tecnologias usadas

- Ionic
- Angular
- IndexedDB
- Typescript

## Rodando o projeto localmente

- Instalar o nodejs versão 20+
- Instalar a CLI do ionic versão 7.2.0
- Baixar o projeto no repositório do github
- Navegar pelo terminal até a pasta raiz do projeto baixado e rodar o comando
  `npm install`
- Depois rodar o comando `ionic serve` e abrir o navegador em http://localhost:8100

## Instalação do APK no dispositivo movel

- No seu dispositivo movel vá em configurações e habilite a opção de instalar apps por fontes externas
  - Se usar um emulador de android não precisa desse passo!
- Navegue até a pasta `apk` e importe o arquivo `app-debug.apk` para seu dispositivo movel ou emulador de android

## Rodando os testes unitários

- É preciso ter o navegador Chrome instalado
- Na pasta raiz do projeto rode o comando:
  - Para navegador Chrome: `npm run test`
  - Para navegador Firefox: `npm run test:firefox`

## Demonstração

Visite a demonstração no link abaixo
[Demo](https://teste-bsn.web.app)
