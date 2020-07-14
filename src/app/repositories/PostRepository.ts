import { Repository, getRepository } from 'typeorm'
import { Post } from '../../database/entities/Post'

export class PostRepository {
  private repo: Repository<Post>

  constructor() {
    this.repo = getRepository(Post)
  }

  getById = async (id: number) => await this.repo.findOne({ id })

  create = async (payload: any) => this.repo.create(payload as Post)

  save = async (post: Post) => await this.repo.save(post)

  postOnWall = async (query: {
    page: number,
    perPage: number,
    wallId: number,
  }) => {
    const { perPage, page, wallId } = query
    const [rows, count] = await this.repo.createQueryBuilder('post')
      .where('post.wallId = :wallId', { wallId })
      .skip(((perPage * page) - perPage))
      .take(perPage)
      .orderBy('post.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  list = async (query: {
    page: number,
    perPage: number,
    userId: number,
  }) => {
    const { perPage, page, userId } = query
    const [rows, count] = await this.repo.createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .skip(((perPage * page) - perPage))
      .take(perPage)
      .orderBy('post.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  get = async (id: number) => await this.repo.createQueryBuilder('post')
    .loadRelationCountAndMap('post.commentsCount', 'post.comments')
    .where('post.id = :id', { id })
    .getOne()

  delete = async (postId: number, userId: number) =>
    await this.repo.createQueryBuilder()
      .softDelete()
      .from(Post)
      .where('id = :postId', { postId })
      .andWhere('userId = :userId', { userId })
      .execute()

  relatedPosts = async (query: {
    page: number,
    perPage: number,
    userId: number,
  }) => {
    const { perPage, page, userId } = query
    const [rows, count] = await this.repo.createQueryBuilder('post')
      .leftJoinAndSelect('post.wall', 'wall')
      .leftJoinAndSelect('wall.members', 'member')
      .where('member.id = :userId', { userId })
      .andWhere('post.userId != :userId', { userId })
      .select('post.id')
      .addSelect('post.content')
      .addSelect('post.color')
      .addSelect('post.createAt')
      .skip(((perPage * page) - perPage))
      .take(perPage)
      .orderBy('post.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }
}
