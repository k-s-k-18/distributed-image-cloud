import jwt from 'jsonwebtoken';

export const generateToken = (user_id)=>{
    const payload = {
        id:user_id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {algorithm: 'HS256'});

}