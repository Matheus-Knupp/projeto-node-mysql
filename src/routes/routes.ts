import { Router, Request, Response } from "express";

//controllers
import { ProductController } from "../controllers/productController";

const routes = Router();

// Rota Principal
routes.get('/', function(req:Request, res:Response){
    res.render('home');
});

routes.get('/list_products', ProductController.listAll)

// Rota do Formulario
routes.get('/form', ProductController.listAll)

// Rota de Cadastro
routes.post('/register', ProductController.create);

export default routes;