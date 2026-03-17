import jwt from 'jsonwebtoken';
import { type Request, type Response } from 'express';

const SECRET = process.env.SECRET_JWT || '';

export function autenticar(req: any, res: Response, next: any) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}