import express from "express";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import routes from "./routes/routes";

// App
const app = express();

// Adicionar Express-FileUpload
app.use(fileUpload())

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Adiciona Rotas
app.use(routes);

// Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adicionar CSS
app.use('/css', express.static('./css'))

// Configurar express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

export default app;