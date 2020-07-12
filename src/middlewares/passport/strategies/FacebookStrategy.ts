import dotenv from 'dotenv'
import { Strategy, StrategyOption } from 'passport-facebook'
dotenv.config()

const strategyOptions: StrategyOption = { 
  clientID: process.env.FACEBOOK_APP_ID as string,
  clientSecret: process.env.FACEBOOK_SECRET as string,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
  profileFields: [
    'id',
    'emails',
    'displayName',
    'name',
    'gender',
    'profileUrl',
    'birthday',
    'picture.type(large)',
  ],
}

export const facebookStrategy = new Strategy(strategyOptions,
  async (accessToken, refreshToken, profile, done) => done(null, profile))
