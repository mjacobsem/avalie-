CREATE TABLE Filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    ano_lancamento YEAR,
    genero VARCHAR(255),
    diretor VARCHAR(255),
    sinopse TEXT
);

CREATE TABLE Avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_avaliador VARCHAR(255),
    nota TINYINT,
    comentario TEXT,
    filme_id INT,
    FOREIGN KEY (filme_id) REFERENCES Filmes(id)
);