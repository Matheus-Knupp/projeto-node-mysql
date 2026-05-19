import { conexao } from "../../database/connection";

// Define o formato do objeto
interface product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default async function listProductService(): Promise<product[]> {

    //Define o que será consultado no banco
    const sql = `
            SELECT id, name, price, image FROM products
        `;
    
    // Executa a consulta
    const [rows] = await conexao.promise().query(sql);
    return rows as product[];
}