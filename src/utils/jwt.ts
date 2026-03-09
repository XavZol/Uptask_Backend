import jwt from 'jsonwebtoken'
import Types from 'mongoose'

type UserPayLoad = {
    _id: string
}

export const generateJWT = (payload: UserPayLoad) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })
    return token
}
