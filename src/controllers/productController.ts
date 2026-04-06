import { ProductService } from "../services/productService";
import { Request, Response } from "express";

export class ProductController {
    static async create(req: Request, res: Response) {
       try {
        const { name, price} = req.body;

        if (!req.files || !req.files.image) {
            return res.status(400).send('Imagem é obrigatória');
        }

        const image = req.files.image;

        if (Array.isArray(image)) {
            return res.status(400).send('Imagem é obrigatória');
        }
        console.log(req.body);

        await ProductService.create({name, price: parseFloat(price), image});

        return res.status(201).send('Produto cadastrado com sucesso');

        } catch (err: any) {
            return res.status(400).send(err.message);
       }
    }
}