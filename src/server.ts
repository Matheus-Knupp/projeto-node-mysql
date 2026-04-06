import app from "./app";

// Definir a porta do servidor
const port = process.env.PORT || 8080

// Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});