const users = {
  domain: '/users',
  authFacebook: '/auth/facebook',
  authGoogle: '/auth/google',
}

const walls = {
  domain: '/walls',
  create: '/',
  unjoin: '/unjoin/:wallId',
  join: '/join/:wallId',
  list: '/list',
  get: '/:wallId',
}

const posts = {
  domain: '/posts',
  create: '/:wallId',
  list: '/list',
  delete: '/:postId',
  get: '/:postId',
  relatedPosts: '/related-posts',
}

const comments = {
  domain: '/comments',
  create: '/:postId',
}

const notifications = {
  domain: '/notifications',
}

export const Paths = {
  users,
  walls,
  posts,
  comments,
  notifications,
}
