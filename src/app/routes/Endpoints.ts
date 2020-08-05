const users = {
  resource: '/users',
  authFacebook: '/auth/facebook',
  authGoogle: '/auth/google',
  refreshToken: '/refresh-token',
  logout: '/logout',
  editUsername: '/edit-username',
}

const walls = {
  resource: '/walls',
  create: '/',
  collections: '/',
  leave: '/:wallId/leave',
  join: '/:wallId/join',
  get: '/:wallId',
}

const posts = {
  resource: '/posts',
  collections: '/',
  like: '/:postId/like',
  unlike: '/:postId/unlike',
  create: '/:wallId',
  delete: '/:postId',
  relatedPosts: '/related-posts',
  get: '/:postId',
}

const comments = {
  resource: '/comments',
  create: '/:postId',
  collections: '/:postId',
  delete: '/:commentId',
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
