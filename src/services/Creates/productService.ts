import { UploadedFile } from 'express-fileupload';
import { conexao } from '../../database/connection';
import { saveFile } from '../../utils/upload';
import { ResultSetHeader } from 'mysql2';

interface CreateProductDTO {
  name: string;
  price: number;
  image: UploadedFile;
}

export class ProductService {
  static async create(data: CreateProductDTO): Promise<{id: number}> {
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

    return new Promise<{id: number}>((resolve, reject) => {
      conexao.query(sql, [name, price, fileName], (err, result) => {
        if (err) return reject(err);
        console.log(result);
        resolve({id: (result as ResultSetHeader).insertId});
      });
    });
  }
}
