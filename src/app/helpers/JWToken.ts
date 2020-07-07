import jwt, { Secret } from 'jsonwebtoken'
import { UserDTO } from '../domain/dtos/UserDTO'

export const JWToken = {
  verifyToken: async (token: string): Promise<any> =>
    await jwt.verify(token, process.env.JWT_SECRET as string | Buffer),

  generateToken: async (user: UserDTO) =>
    ({ token: await jwt.sign({ user }, process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_TOKEN_EXPIRE })
    })
}
