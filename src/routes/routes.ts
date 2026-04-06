import { Router } from "express";
import { Request, Response } from "express";

import { ProductController } from "../controllers/productController";

const routes = Router();

// Rota Principal
routes.get('/', function(req:Request, res:Response){
    res.render('home');
});

// Rota do Formulario
routes.get('/form', function(req:Request, res:Response){
    res.render('form');
})

// Rota de Cadastro
routes.post('/register', ProductController.create);

export default routes;