import passport from 'passport'

export const googleMiddle = {
  authenticate: () => passport.authenticate('google', {
    scope: ['profile', 'email']
  }),
  authenticateCallBack: () => passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  })
}
