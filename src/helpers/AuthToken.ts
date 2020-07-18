import { Response } from 'express'
import { Secret, verify, sign } from 'jsonwebtoken'
import { Paths } from '../app/routes/Paths'
import { UserDTO } from '../app/domain/dtos/UserDTO'

export const AuthToken = {
  verifyToken: async (token: string): Promise<any> =>
    verify(token, process.env.JWT_SECRET as string | Buffer),

  verifyRefreshToken: async (token: string): Promise<any> =>
    verify(token, process.env.JWT_REFRESH_TOKEN_SECRET as string | Buffer),

  verifyRandomToken: async (token: string): Promise<any> =>
    verify(token, process.env.JWT_RANDOM_TOKEN_SECRET as string | Buffer),

  generateToken: async (user: UserDTO) => sign({ user },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.JWT_TOKEN_EXPIRE }
  ),

  generateRefreshToken: async (user: UserDTO) => sign({ user },
    process.env.JWT_REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE }
  ),

  generateRandomToken: async (data: any) => sign({ data },
    process.env.JWT_RANDOM_TOKEN_SECRET as Secret,
    { expiresIn: process.env.JWT_RANDOM_TOKEN_EXPIRE }
  ),

  sendRefreshToken: (res: Response, token: string) => {
    const expires = new Date()
    expires.setHours(parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE?.split('h')[0] as string))
    return res.cookie('_cxtk', token, {
      httpOnly: true,
      expires,
      // path: Paths.users.refreshToken,
    })
  }
}
