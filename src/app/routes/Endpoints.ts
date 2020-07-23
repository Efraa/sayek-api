const users = {
  domain: '/users',
  authFacebook: '/auth/facebook',
  authGoogle: '/auth/google',
  refreshToken: '/refresh-token',
  logout: '/logout',
  editUsername: '/edit-username',
}

const walls = {
  domain: '/walls',
  create: '/',
  leave: '/leave/:wallId',
  join: '/join/:wallId',
  list: '/list',
  get: '/get/:wallId',
}

const posts = {
  domain: '/posts',
  create: '/:wallId',
  list: '/list',
  delete: '/:postId',
  get: '/get/:postId',
  relatedPosts: '/related-posts',
  like: '/like/:postId',
  unlike: '/unlike/:postId',
}

const comments = {
  domain: '/comments',
  create: '/:postId',
  list: '/list/:postId',
  delete: '/:commentId',
}

const notifications = {
  domain: '/notifications',
}

export const Endpoints = {
  users,
  walls,
  posts,
  comments,
  notifications,
}
