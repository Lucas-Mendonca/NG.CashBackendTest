
NG.Cash web application challenge


Desenvolvedor:
    
- Lucas Machado Barbosa Mendonça


Essas instruções permitirão que você obtenha uma cópia do projeto
em operação na sua máquina local para fins de desenvolvimento e teste.


Pré-requisitos:

- Docker
- Docker-compose

Verificar antes de  Instalar / Criar os Contêineres:

- Cheque se as portas 3333 e 5432 estão livres


Instalação / Criação dos Contêineres:

    Acesse a pasta desse arquivo atravez do terminal, após isso
    rode os seguintes comandos:

- npm install
- sudo docker-compose up


Instruções de uso:

    Para saber como utilizar essa aplicação, em acesse o seguinte
    link em seu navegador (Os Contêineres devem estar "up" para
    que isso seja possível, caso tenham sido parados: rode o
    seguinte comando: sudo docker-compose start):

- http:/http://localhost:3333/docs

Ajuste os valores da .env.example para os valores desejados e depois remova
a extensão .example

Obs: DB_URL é a url usada pelo prisma pra se connectar ao DB, caso esteja usando
as configurações padrões da docker-compose não é necessario trocar a url.