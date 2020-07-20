import dotenv from 'dotenv'
import { Strategy, StrategyOptions } from 'passport-google-oauth2'
dotenv.config()

const strategyOptions: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
  proxy: true,
}

export const googleStrategy = new Strategy(
  strategyOptions,
  async (accessToken, refreshToken, profile, done) => done(null, profile)
)
