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
  collection: '/',
  join: '/:wallId/join',
  document: '/:wallId',
}

const posts = {
  resource: '/posts',
  collection: '/',
  like: '/:postId/like',
  create: '/:wallId',
  relatedPosts: '/related-posts',
  document: '/:postId',
}

const comments = {
  resource: '/comments',
  collection: '/:postId',
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
