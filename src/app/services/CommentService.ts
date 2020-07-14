import { config } from '../../config'
import { Comment } from 'src/database/entities/Comment'
import { CommentMapper } from '../domain/mappers/CommentMapper'
import { CommentRepository } from '../repositories/CommentRepository'
import { CommentDTO } from '../domain/dtos/CommentDTO'
import { CommentMessages } from '../utils/messages/CommentMessages'
import { ErrorHandler, statusCodes } from '../../http'

export class CommentService {
  constructor(
    private _commentRepository: CommentRepository,
    private _commentMapper: CommentMapper,
  ) {}

  mapToEntity = async (commentPayload: any): Promise<Comment> =>
    await this._commentMapper.mapToEntity(commentPayload)

  create = async (commentEntity: Comment): Promise<CommentDTO> =>
    await this._commentRepository.save(commentEntity)
      .then(comment => this._commentMapper.mapToDTO(comment))

  getById = async (id: number) =>
    await this._commentRepository.getById(id)

  commentOnPost = async (query: {
    postId: number,
    page?: number,
    perPage?: number,
  }) => {
    const { page, perPage, postId } = query
    const list = await this._commentRepository.commentOnPost({
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
      postId,
    })

    return {
      comments: this._commentMapper.mapListToDTO(list.rows),
      all: list.all,
      pages: list.pages,
    }
  }
}
