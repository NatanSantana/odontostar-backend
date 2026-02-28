import { type Request, type Response } from 'express';
import { registrarUser, loginUser } from '../service/UserService.ts';  

export async function createUser(req: Request, res: Response) {
  try {
    var user = await registrarUser(req.body);
    return res.status(201).json({ user });

  } catch (error: any) {
    return res.status(400).json({ message: user});
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    const user = await loginUser(email, senha);

    if (!user) {
      return res.status(401).json({ message: 'CPF ou senha inválidos' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}