import jwt from 'jsonwebtoken';
import { type Request, type Response } from 'express';

const SECRET = process.env.SECRET_JWT || '';

export function autorizarRole(role: string) {
  return (req: any, res: Response, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    try {
      const decoded: any = jwt.verify(token, SECRET);
      if (decoded.role !== role) return res.status(403).json({ message: 'Acesso negado' });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}