import Users from '../models/Users.ts';
import bcrypt from 'bcrypt';
import { differenceInYears, parse} from 'date-fns';
import jwt from 'jsonwebtoken'

const SECRET = (process.env.SECRET_JWT || '');


async function registrarUser(data: any) {
    const especialChars = /[!@#$%^&*(),.?":{}|<>]/;
        const user = new Users(data);
        console.log(user.dataNascimento)
        const dataNascimentoParsed = parse(user.dataNascimento.toString(), 'dd/MM/yyyy', new Date());
        console.log(dataNascimentoParsed)
        if (user.cpf) {
            const existingUser = await Users.findOne({ cpf: user.cpf });
            if (existingUser) {
                throw new Error("Usuário já existente");
            }

            if (user.cpf.length !== 11 || Number.isNaN(Number(user.cpf))) {
            throw new Error("O cpf deve ter apenas 11 dígitos e apenas números");
            }

            if(!user.email.endsWith("@gmail.com")) throw new Error("Email inválido")

            const existingEmail = await Users.findOne({ email: user.email });

            if (existingEmail) {
                throw new Error("Email já cadastrado");
            }

            if (user.senha.length < 8 || !especialChars.test(user.senha)) {
                throw new Error('Senha inválida. A senha deve ter pelo menos 8 caracteres e conter pelo menos um caractere especial.');
            }

            if (differenceInYears(new Date(), dataNascimentoParsed) < 18) {
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
        
        throw new Error('Usuário não encontrado.');
    } else {
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            
            throw new Error('Senha OU email incorreto.');
        } else {
            console.log('Login bem-sucedido.');
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role, cpf: user.cpf },
                SECRET,
                { expiresIn: '2h' }
            )
            return { token: token,
                    role: user.role
             };
        }
    }
};

async function buscarUserByCpf(cpfDigitado: string) {
  const user = await Users.findOne({ cpf: cpfDigitado });

  if (!user) throw new Error('Não existe usuário com esse CPF.');

  const idade = differenceInYears(new Date(), new Date(user.dataNascimento));
  const { nomeCompleto, cpf, email, telefone, bairro, cidade } = user.toObject();

  return { nomeCompleto, cpf, email, telefone, bairro, cidade, idade };
}

export { registrarUser, loginUser, buscarUserByCpf };