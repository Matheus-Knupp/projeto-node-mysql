import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import mysql from "mysql2"; 

// Definir a porta do servidor
const port = process.env.PORT || 8080

// App
const app = express();

// Adicionar Express-FileUpload
app.use(fileUpload())

// Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adicionar CSS
app.use('/css', express.static('./css'))

// Configurar express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configurar conexão
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'igreja'
})

// Teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso!');
})

// Rota Principal
app.get('/', function(req:Request, res:Response){
    res.render('home');
});

// Rota do Formulario
app.get('/form', function(req:Request, res:Response){
    res.render('form');
})

// Rota de Cadastro
app.post('/register', function(req:Request, res:Response){
    // console.log(req.files.image.name);
    res.end();
})

// Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});