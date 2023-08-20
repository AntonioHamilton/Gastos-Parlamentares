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
      latitude: user.latitude,
      longitude: user.longitude
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
    const userExistent = await User.findOne({ email: user.email }).select('-password');

    if (!userExistent) {
      return { status: 401, error: 'Esse token é inválido' };
    }

    return { status: 200, result: { latitude: userExistent.latitude, longitude: userExistent.longitude, name: userExistent.name } };
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
    const userExistent = await User.findOne({ email: user.email }).select('-password');

    if (!userExistent) {
      return { status: 401, error: 'Esse token é inválido' };
    }

    userExistent.latitude = latitude;
    userExistent.longitude = longitude;
  
    await userExistent.save();

    return { status: 200 };
  } catch (e) {
    console.log(e)
    return { status: 500, error: "Erro no servidor" }
  }
}