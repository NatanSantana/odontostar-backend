import { type Request, type Response } from 'express';
import { registrarUser, loginUser, buscarUserByCpf } from '../service/UserService.ts';  

export async function createUser(req: Request, res: Response) {
  try {
    var user = await registrarUser(req.body);
    return res.status(201).json({ user });

  } catch (error: any) {
    return res.status(400).json({ message: error.message});
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    const user = await loginUser(email, senha);
    return res.status(200).json(user);

  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}

export async function buscarUserCpf(req: Request, res: Response) {
  try {
    const { cpf } =  req.query;
    const user = await buscarUserByCpf(cpf as string) 
    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(404).json({message: error.message})
  }
}