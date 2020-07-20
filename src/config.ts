import dotenv from 'dotenv'
dotenv.config()

export const config = {
  SERVER: {
    PORT: parseInt(process.env.PORT as string),
    PREFIX_ROUTES: process.env.PREFIX_ROUTES as string,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE,
  },
  PAGINATION: {
    PAGE: parseInt(process.env.PAGINATION_PAGE as string),
    PER_PAGE: parseInt(process.env.PAGINATION_PER_PAGE as string),
    POST_PER_PAGE: parseInt(process.env.POST_PER_PAGE as string),
    COMMENTS_PER_PAGE: parseInt(process.env.COMMENTS_PER_PAGE as string),
    COMMENTS_POSTS_PER_PAGE: parseInt(
      process.env.COMMENTS_POSTS_PER_PAGE as string
    ),
  },
  AGENT_CLIENT: process.env.AGENT_CLIENT,
}
