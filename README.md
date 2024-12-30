# Documentação do Projeto

## Como Executar os Scripts

1. **Pré-requisitos:**
   - Certifique-se de ter o Node.js instalado na versão 16 ou superior.
   - Um banco de dados local ou remoto configurado (de preferência MYSQL).

2. **Instalação:**
   - Após clonar o repositório

   - Instale as dependências:

     npm install express, cors, body-parser, mysql2, mysql, axios e outra se houver ou precisar


3. **Configuração do Banco de Dados:**
   - Certifique-se de que o banco de dados está configurado conforme o que foi feito e mostrado no video

4. **Execução do XAMPP:**
   - Abra o XAMPP e inicie o MYSQL

5. **Execução do Servidor:**
   - Inicie o servidor dentro da pasta do projeto usando o seguinte comando:

    `node server.js`

## Decisões Técnicas

### Banco de Dados
- **Escolha do Banco de Dados:**
  - Optei por usar MYSQL por ser um bom banco de dados, com boa escalabilidade, suporte a maiores transações para futuros updates e simples de utilizar.

- **Estrutura das Tabelas:**
  - A tabela `filmes` contém informações principais sobre os filmes, como título, ano de lançamento, gênero e sinopse.
  - A tabela `avaliacoes` foi criada para armazenar feedback dos usuários, permitindo que múltiplas avaliações sejam associadas a um único filme e mantidas no banco de dados até sua exclusão. Assim que inserido um comentário por dentro do próprio site, é atualizado simultaneamente no banco de dados.

### Scripts
- **Scripts de API:**
  - Foram desenvolvidos endpoints RESTful para criar, recuperar e manipular dados de filmes e avaliações usando a API da OMDb API
  - A biblioteca `fetch` foi usada no front-end para chamadas de API assíncronas.

- **Interação com OMDB API:**
  - Decidi integrar com a OMDB API por ter sido o recomendado e para enriquecer os dados dos filmes com informações adicionais, como pôsteres e avaliações do IMDB em tempo real.
  - O site faz o consumo da API e implementa os dados no banco de dados e posteriormente é utilizado nas funcionalidades do site. API > MYSQL > Site
  - As requisições foram implementadas de forma que permitam tratar erros e garantir a robustez da aplicação.

### Front-End
- Usei HTML, CSS e JavaScript puro para criar uma interface intuitiva e responsiva.
- O CSS foi otimizado para reduzir duplicação e melhorar a consistência com a aplicação de boas práticas como uso de classes reutilizáveis e media queries para responsividade.

## Limitações e Melhorias Futuras

### Limitações
1. **Desempenho:**
   - As chamadas assíncronas para OMDB API podem ser afetadas por limites de requisições.

2. **Funcionalidade:**
   - Atualmente, a funcionalidade de busca é limitada a uma correspondência exata do título do filme.
   - Não há suporte para edição ou remoção de filmes e avaliações. Somente direto pelo banco de dados

### Melhorias Futuras

1. **Interface do Usuário:**
   - Adicionar paginação e filtros na exibição da lista de filmes.
   - Implementar notificações em tempo real para ações como adição de avaliações.
   - Adicionar a funcionalidade de excluir comentário e filme de acordo com a permissão necessária.
   - Tradução em tempo real dos detalhes do filme para pt-br
   - Melhoria geral na interface visando acessibilidade/facilidade e uma boa interface.
   - Sistema de avaliações externas, onde se algum usuário avalia o filme ele puxa essa informação de uma API de preferência e utiliza como base para avaliação do filme em questão visando garantir maior fidelidade a avaliações.

2. **Segurança:**
   - Implementar autenticação e autorização para acesso a funcionalidades específicas.
   - Adicionar validação mais robusta nos endpoints do back-end para evitar possíveis vulnerabilidades.

3. **Melhorias de Funcionalidade:**
   - Criar relatórios analíticos baseados nas avaliações recebidas.

4. **Código:**
   - Transferência dos scripts que estão no html para um JavaScript externo. Não foi feito devido ao tempo para conclusão do teste e maior facilidade para lidar com a visibilidade do código na hora da escrita.
   - Comentar o código para maior legibilidade e entendimento do código.

---