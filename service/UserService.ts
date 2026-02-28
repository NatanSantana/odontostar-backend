import Users from '../models/Users.ts';
import bcrypt from 'bcrypt';
import { differenceInYears } from 'date-fns';
import jwt from 'jsonwebtoken'

const SECRET = (process.env.SECRET_JWT || '');


async function registrarUser(data: any) {
    const especialChars = /[!@#$%^&*(),.?":{}|<>]/;

        const user = new Users(data);
        if (user.cpf) {
            const existingUser = await Users.findOne({ cpf: user.cpf });
            if (existingUser) {
                throw new Error("Usuário já existente");
            }

            if (user.senha.length < 8 || !especialChars.test(user.senha)) {
                throw new Error('Senha inválida. A senha deve ter pelo menos 8 caracteres e conter pelo menos um caractere especial.');
            }

            if (differenceInYears(new Date(), new Date(user.dataNascimento)) < 18) {
                throw new Error('Usuário deve ter pelo menos 18 anos.');
            }

            const senhaCrypto = await bcrypt.hash(user.senha, 10);
            user.senha = senhaCrypto;
            await user.save();

        } else {
            throw new Error('CPF é obrigatório para o registro.');
        }
}


async function loginUser(email: string, senha: string) {
    
    const user = await Users.findOne({ email: email });
    
    if (!user) {
        console.log('Usuário não encontrado.');
        throw new Error('Usuário não encontrado.');
    } else {
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            console.log('Senha ou email incorreto.');
            throw new Error('Senha OU email incorreto.');
        } else {
            console.log('Login bem-sucedido.');
            const token = jwt.sign(
                { id: user._id, email: user.email },
                SECRET,
                { expiresIn: '2h' }
            )
            return { token };
        }
    }
};

export { registrarUser, loginUser };