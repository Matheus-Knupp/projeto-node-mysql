import { UploadedFile } from 'express-fileupload';
import { conexao } from '../database/connection';
import { saveFile } from '../utils/upload';

interface CreateProductDTO {
  name: string;
  price: number;
  image: UploadedFile;
}

export class ProductService {
  static async create(data: CreateProductDTO): Promise<void> {
    const { name, price, image } = data;

    // 1. validação
    if (!name || name.trim().length === 0) {
      throw new Error('Nome é obrigatório');
    }

    if (isNaN(price) || price <= 0) {
      throw new Error('Preço inválido');
    }

    if (!image) {
      throw new Error('Imagem é obrigatória');
    }

    // 2. upload
    const fileName = await saveFile(image);

    // 3. persistência
    const sql = `
      INSERT INTO products (name, price, image)
      VALUES (?, ?, ?)
    `;

    await new Promise<void>((resolve, reject) => {
      conexao.query(sql, [name, price, fileName], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
