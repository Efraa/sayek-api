const users = {
  domain: '/users',
  authFacebook: '/auth/facebook',
  authGoogle: '/auth/google',
}

const walls = {
  domain: '/walls',
  create: '/create',
  unjoin: '/unjoin/:wallId',
  join: '/join/:wallId',
  list: '/list',
  get: '/get/:wallId',
}

const posts = {
  domain: '/posts',
  create: '/create',
  list: '/list',
  delete: '/delete/:postId',
}

const comments = {
  domain: '/comments',
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
