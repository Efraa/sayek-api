import passport from 'passport'
import { Response, Request, NextFunction } from 'express'
import { AuthToken } from '../../../helpers'

export const facebookMiddle = {
  authenticate: async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('facebook', { 
      scope: ['user_photos', 'email', 'public_profile'],
      state: await AuthToken.generateRandomToken({ query: req.query }),
    })(req, res, next),

  authenticateCallBack: () => passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
    passReqToCallback: true,
  })
}
