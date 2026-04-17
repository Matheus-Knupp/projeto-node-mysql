import { ProductService } from "../services/Creates/productService";
import { Request, Response } from "express";
import listProductService from "../services/Reads/productService";

export class ProductController {
    static async create(req: Request, res: Response) {
       try {
        const { name, price } = req.body;

        if (!req.files || !req.files.image) {
            return res.status(400).send('Imagem é obrigatória');
        }

        const image = req.files.image;

        if (Array.isArray(image)) {
            return res.status(400).send('Envie apenas uma imagem');
        }
        console.log(req.body);
        console.log(image.name);

        await ProductService.create({name, price: parseFloat(price), image});
        
        return res.redirect('/form');

        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                return res.render('form', { error: error.message });
                // return res.status(400).send(err.message);
            }
            console.error(error);
            return res.status(500).send('Erro ao cadastrar produto');
       }
    }

    static async listAll(req: Request, res: Response) {
        try {
            const products = await listProductService();
            return res.render('list', {products});
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao buscar produtos');
        }
    }
}