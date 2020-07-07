import { UserDTO } from '../../app/domain/dtos/UserDTO'

declare global {
  namespace Express {
    export interface Request {
      user?: UserDTO
    }
  }
}