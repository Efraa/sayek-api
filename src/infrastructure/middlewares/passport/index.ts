import passport from 'passport'
import { facebookStrategy } from './strategies/FacebookStrategy'
import { googleStrategy } from './strategies/GoogleStrategy'
import { facebookMiddle } from './middles/FacebookMiddle'
import { googleMiddle } from './middles/GoogleMiddle'

passport.use(facebookStrategy)
passport.use(googleStrategy)

export { passport, facebookMiddle, googleMiddle }
