import passport from 'passport'

export const facebookMiddle = {
  authenticate: () => passport.authenticate('facebook', { 
    scope: ['user_photos', 'email', 'public_profile']
  }),
  authenticateCallBack: () => passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  })
}
