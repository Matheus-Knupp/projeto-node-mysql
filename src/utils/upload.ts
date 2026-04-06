import path from 'path';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

interface UploadOptions {
  folder?: string;
  allowedMimeTypes?: string[];
  maxSize?: number; // bytes
}

export const saveFile = async (
  file: UploadedFile,
  options?: UploadOptions
): Promise<string> => {
  const folder = options?.folder || 'uploads';
  const allowedMimeTypes = options?.allowedMimeTypes || [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];
  const maxSize = options?.maxSize || 2 * 1024 * 1024; // 2MB

  // 1. validação de tipo
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Tipo de arquivo não permitido');
  }

  // 2. validação de tamanho
  if (file.size > maxSize) {
    throw new Error('Arquivo muito grande');
  }

  // 3. garantir que pasta existe
  const uploadPath = path.resolve(folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // 4. gerar nome único
  const fileExtension = path.extname(file.name);
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}${fileExtension}`;

  const fullPath = path.join(uploadPath, fileName);

  // 5. salvar arquivo
  await file.mv(fullPath);

  // 6. retorno (importante!)
  return fileName;
};
