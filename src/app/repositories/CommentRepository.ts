import { Repository, getRepository } from 'typeorm'
import { Comment } from '../../database/entities/Comment'

export class CommentRepository {
  private repo: Repository<Comment>
  private fields: string[] = [
    'comment.id',
    'comment.content',
    'comment.createAt',
    'user.id',
    'user.username',
  ]

  constructor() {
    this.repo = getRepository(Comment)
  }

  getById = async (id: number) => await this.repo.findOne({ id })

  create = async (payload: any) => this.repo.create(payload as Comment)

  save = async (comment: Comment) => await this.repo.save(comment)

  commentOnPost = async (query: {
    page: number,
    perPage: number,
    postId: number,
  }) => {
    const { perPage, page, postId } = query
    const [rows, count] = await this.repo.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')  
      .where('comment.postId = :postId', { postId })
      .select(this.fields)
      .skip(((perPage * page) - perPage))
      .take(perPage)
      .orderBy('comment.id', 'ASC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  delete = async (commentId: number, userId: number) =>
    await this.repo.createQueryBuilder()
      .softDelete()
      .from(Comment)
      .where('id = :commentId', { commentId })
      .andWhere('userId = :userId', { userId })
      .execute()
}
