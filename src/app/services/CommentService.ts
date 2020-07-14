import { Comment } from 'src/database/entities/Comment'
import { CommentMapper } from '../domain/mappers/CommentMapper'
import { CommentRepository } from '../repositories/CommentRepository'
import { CommentDTO } from '../domain/dtos/CommentDTO'

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
}
