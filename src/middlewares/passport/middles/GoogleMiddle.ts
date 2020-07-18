import passport from 'passport'
import { Response, Request, NextFunction } from 'express'
import { AuthToken } from '../../../helpers'

export const googleMiddle = {
  authenticate: async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: await AuthToken.generateRandomToken({ query: req.query }),
    })(req, res, next),

  authenticateCallBack: () => passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
    passReqToCallback: true,
  })
}
