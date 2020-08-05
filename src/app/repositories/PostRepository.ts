import { Repository, getRepository } from 'typeorm'
import { Post } from '../../database/entities/Post'

export class PostRepository {
  private repo: Repository<Post>
  private fields: string[] = [
    'post.id',
    'post.content',
    'user.id',
    'user.username',
    'post.createAt',
    'post.color',
  ]

  constructor() {
    this.repo = getRepository(Post)
  }

  getById = async (id: number) => this.repo.findOne({ id })

  create = async (payload: any) => this.repo.create(payload as Post)

  save = async (post: Post) => this.repo.save(post)

  postOnWall = async (query: {
    page: number
    perPage: number
    wallId: number
  }) => {
    const { perPage, page, wallId } = query
    const [rows, count] = await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .where('post.wallId = :wallId', { wallId })
      .select(this.fields)
      .skip(perPage * page - perPage)
      .take(perPage)
      .orderBy('post.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  collections = async (query: {
    page: number
    perPage: number
    userId: number
  }) => {
    const { perPage, page, userId } = query
    const [rows, count] = await this.repo
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .skip(perPage * page - perPage)
      .take(perPage)
      .orderBy('post.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  get = async (id: number) =>
    this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .where('post.id = :id', { id })
      .select(this.fields)
      .getOne()

  isLiked = async (postId: number, userId: number) =>
    this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like')
      .where('post.id = :postId', { postId })
      .andWhere('like.id = :userId', { userId })
      .select('post.id')
      .getOne()

  likesMany = async (query: { userId: number; postsIds: number[] }) => {
    const { userId, postsIds } = query
    const posts = await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like')
      .where('like.id = :userId', { userId })
      .andWhere('post.id in (:...postsIds)', { postsIds })
      .select('post.id')
      .orderBy('post.id', 'DESC')
      .getMany()

    return posts
  }

  delete = async (postId: number, userId: number) =>
    this.repo
      .createQueryBuilder()
      .softDelete()
      .from(Post)
      .where('id = :postId', { postId })
      .andWhere('userId = :userId', { userId })
      .execute()

  relatedPosts = async (query: { page: number; perPage: number }) => {
    const { perPage, page } = query
    const [rows, count] = await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .select(this.fields)
      .skip(perPage * page - perPage)
      .take(perPage)
      .orderBy('post.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  like = async (postId: number, userId: number) =>
    this.repo
      .createQueryBuilder()
      .relation(Post, 'likes')
      .of(postId)
      .add(userId)
      .then(() => ({ postId, userId }))
      .catch(() => undefined)

  unlike = async (postId: number, userId: number) =>
    this.repo
      .createQueryBuilder()
      .relation(Post, 'likes')
      .of(postId)
      .remove(userId)
      .then(() => ({ postId, userId }))
      .catch(() => undefined)
}
