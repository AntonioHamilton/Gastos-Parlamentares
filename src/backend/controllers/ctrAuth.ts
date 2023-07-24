import User from "../models/bills"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

type LoginProps = {
    email: string,
    password: string
}

type RegisterProps = {
    name: string,
    email: string,
    password: string
}

export const login = async  ({ email, password}: LoginProps) => {
    try {
        const user = await User.findOne({ email }).select('+password');
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!user || !passwordsMatch) {
            return { status: 400, error: 'Email ou senha incorretos.' };
        }

        const token = jwt.sign({ user }, process.env.SECRET!, { expiresIn: '1d' });
        user.password = undefined;

        return { status: 200, result: { user, token } };
    } catch (e) {
        return { status: 500, error: "Erro no servidor" }
    }
}

export const register = async ({name, email, password}: RegisterProps) => {
    try {
        const userExists = await User.findOne({ email });
    
        if (userExists) {
            return { status: 409, error: 'Já existe um usuário cadastrado com esse email!' };
        }
    
        await User.create({name, email, password});

        return { status: 201, result: "Usuário criado com sucesso!" };
    } catch (e) {
        return { status: 500, error: "Erro no servidor" } 
    }
}

export const Authenticate = async (token: string) => {
    const tokenUncoded = jwt.decode(token);
    const { name } = JSON.parse(String(tokenUncoded))

    return !!name
}