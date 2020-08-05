import { config } from '../../config'
import { Comment } from 'src/database/entities/Comment'
import { CommentMapper } from '../domain/mappers/CommentMapper'
import { CommentRepository } from '../repositories/CommentRepository'
import { CommentDTO } from '../domain/dtos/CommentDTO'

export class CommentService {
  constructor(
    private _commentRepository: CommentRepository,
    private _commentMapper: CommentMapper
  ) {}

  mapToEntity = async (commentPayload: any): Promise<Comment> =>
    this._commentMapper.mapToEntity(commentPayload)

  create = async (commentEntity: Comment): Promise<CommentDTO> =>
    this._commentRepository
      .save(commentEntity)
      .then(comment => this._commentMapper.mapToDTO(comment))

  getById = async (id: number) => this._commentRepository.getById(id)

  commentOnPost = async (query: {
    postId: number
    page?: number
    perPage?: number
  }) => {
    const { page, perPage, postId } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.COMMENTS_POSTS_PER_PAGE,
      postId,
    }
    const collections = await this._commentRepository.commentOnPost(options)

    return {
      comments: this._commentMapper.mapListToDTO(collections.rows),
      all: collections.all,
      pages: collections.pages,
      nextPage:
        options.page >= collections.pages
          ? false
          : parseInt(options.page as any) + 1,
    }
  }

  delete = async (commentId: number, userId: number) =>
    this._commentRepository
      .delete(commentId, userId)
      .then(() => ({ commentId, userId }))
}
