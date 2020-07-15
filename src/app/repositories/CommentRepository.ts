import { Repository, getRepository } from 'typeorm'
import { Comment } from '../../database/entities/Comment'

export class CommentRepository {
  private repo: Repository<Comment>

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
      .where('comment.postId = :postId', { postId })
      .skip(((perPage * page) - perPage))
      .take(perPage)
      .orderBy('comment.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }
}
