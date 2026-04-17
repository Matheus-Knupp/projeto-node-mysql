import mysql from "mysql2";
import { Connection } from "mysql2";

// Configuração da conexão
export const conexao: Connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'meu_site'
})

// Teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso!');
})