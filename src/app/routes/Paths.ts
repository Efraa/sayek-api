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
}

const posts = {
  domain: '/posts',
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
