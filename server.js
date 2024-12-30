const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'avaliacao_filmes'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.use(cors());

// Middleware para ler o corpo da requisição em formato JSON
app.use(bodyParser.json());

// Endpoint para adicionar um filme
app.post('/add-movie', (req, res) => {
    const movie = req.body;
    const query = 'INSERT INTO filmes (titulo, ano_lancamento, genero, diretor, sinopse, poster) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [movie.titulo, movie.ano_lancamento, movie.genero, movie.diretor, movie.sinopse, movie.poster], (err, result) => {
        if (err) {
            console.error('Erro ao inserir filme:', err);
            res.json({ success: false });
        } else {
            console.log('Filme inserido com sucesso:', result);
            res.json({ success: true });
        }
    });
});

// Endpoint para obter todos os filmes
app.get('/get-movies', (req, res) => {
    const query = 'SELECT * FROM filmes';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao obter filmes:', err);
            res.status(500).json({ success: false, message: 'Erro ao buscar filmes.' });
            return;
        }
        res.json(results);
    });
});

// Endpoint para obter os detalhes de um filme pelo ID relacionado no bd
app.get('/get-movie-details', (req, res) => {
    const movieId = req.query.id;
    const query = 'SELECT * FROM filmes WHERE id = ?';

    db.query(query, [movieId], (err, result) => {
        if (err) {
            console.error('Erro ao buscar detalhes do filme:', err);
            res.status(500).json({ success: false, message: 'Erro ao buscar detalhes do filme.' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ success: false, message: 'Filme não encontrado.' });
            return;
        }

        res.json(result[0]);
    });
});

// Endpoint para adicionar uma review
app.post('/add-review', (req, res) => {
    const { nome_avaliador, nota, comentario, filme_id } = req.body;

    if (!nome_avaliador || !nota || !comentario || !filme_id) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO avaliacoes (nome_avaliador, nota, comentario, filme_id) VALUES (?, ?, ?, ?)';

    db.query(query, [nome_avaliador, nota, comentario, filme_id], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar avaliação:', err);
            return res.status(500).json({ success: false, message: 'Erro ao adicionar avaliação.' });
        }

        res.json({ success: true, message: 'Avaliação adicionada com sucesso.' });
    });
});


// Endpoint para obter as avaliações de um filme
app.get('/get-reviews', (req, res) => {
    const filmeId = req.query.filme_id;

    if (!filmeId) {
        return res.status(400).json({ success: false, message: 'ID do filme é obrigatório.' });
    }

    const query = 'SELECT nome_avaliador, nota, comentario FROM avaliacoes WHERE filme_id = ?';

    db.query(query, [filmeId], (err, results) => {
        if (err) {
            console.error('Erro ao recuperar avaliações:', err);
            return res.status(500).json({ success: false, message: 'Erro ao recuperar avaliações.' });
        }

        res.json({ success: true, reviews: results });
    });
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});