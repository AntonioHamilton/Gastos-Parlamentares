import User from "../models/user"
import jwt from 'jsonwebtoken'

type GetLocationProps = {
  token: string
}

export const getAllLocations = async ({ token }: GetLocationProps) => {
  try {
    const splitedToken = token.split(' ')[1]
    const tokenUncoded = jwt.decode(splitedToken);
    const { user } = JSON.parse(JSON.stringify(tokenUncoded))
    const userExistent = await User.findOne({ email: user.email }).select('-password');
    
    if (!userExistent) {
      return { status: 401, error: 'Esse token é inválido' };
    }

    const users = await User.find({});

    const usersList = users.map(user => ({
      name: user.name,
      latitude: user.latitude || -10.945688,
      longitude: user.longitude || -37.090376
    }));

    return { status: 200, result: usersList };
  } catch (e) {
    console.log(e)
    return { status: 500, error: "Erro no servidor" }
  }
}

export const getLocation = async ({ token }: GetLocationProps) => {
  try {
    const splitedToken = token.split(' ')[1]
    const tokenUncoded = jwt.decode(splitedToken);
    const { user } = JSON.parse(JSON.stringify(tokenUncoded))
    const userExistent = await User.findOne({ email: user.email });

    if (!userExistent) {
      return { status: 401, error: 'Esse token é inválido' };
    }

    return { status: 200, result: { latitude: userExistent.latitude || -10.945688, longitude: userExistent.longitude || -37.090376, name: userExistent.name } };
  } catch (e) {
    console.log(e)
    return { status: 500, error: "Erro no servidor" }
  }
}

type SetLocationProps = {
  token: string
  latitude: number,
  longitude: number
}

export const setLocation = async ({token, latitude, longitude}: SetLocationProps) => {
  try {
    const splitedToken = token.split(' ')[1]
    const tokenUncoded = jwt.decode(splitedToken);
    const { user } = JSON.parse(JSON.stringify(tokenUncoded))
    const userExists = await User.findOne({ email: user.email });

    if (!userExists) {
      return { status: 401, error: 'Esse token é inválido' };
    }
  
    await User.findOneAndUpdate({ email: user.email }, { latitude, longitude });

    return { status: 200 };
  } catch (e) {
    console.log(e)
    return { status: 500, error: "Erro no servidor" }
  }
}