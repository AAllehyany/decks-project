import jwt from 'jsonwebtoken';

export interface AccessToken {
    role: string,
    userId: number
}

export const provideBotToken = async () => {
    const accessToken: AccessToken = {
        role: 'bot',
        userId: 10
    }

    const tokenString = jwt.sign(accessToken, process.env.JWT_SECRET ?? 'secret');

    return tokenString
}