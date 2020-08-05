const users = {
  resource: '/users',
  update: '/',
  authFacebook: '/auth/facebook',
  authGoogle: '/auth/google',
  refreshToken: '/refresh-token',
  logout: '/logout',
}

const walls = {
  resource: '/walls',
  create: '/',
  collections: '/',
  join: '/:wallId/join',
  document: '/:wallId',
}

const posts = {
  resource: '/posts',
  collections: '/',
  like: '/:postId/like',
  create: '/:wallId',
  relatedPosts: '/related-posts',
  document: '/:postId',
}

const comments = {
  resource: '/comments',
  create: '/:postId',
  collections: '/:postId',
  document: '/:commentId',
}

const notifications = {
  resource: '/notifications',
}

export const Endpoints = {
  users,
  walls,
  posts,
  comments,
  notifications,
}
