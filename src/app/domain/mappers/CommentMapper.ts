import { Mapper } from 'ts-simple-automapper'
import { Comment } from '../../../database/entities/Comment'
import { CommentRepository } from '../../repositories/CommentRepository'
import { CommentDTO } from '../dtos/CommentDTO'

export class CommentMapper {
  constructor(private _commentRepository: CommentRepository) {}

  mapToDTO(from: Comment): CommentDTO {
    const commentDTO: CommentDTO = new Mapper().map(from, new CommentDTO())
    return commentDTO
  }

  mapToEntity = async (from: any): Promise<Comment> =>
    this._commentRepository.create(from)

  mapListToDTO = (comments: Comment[]): CommentDTO[] =>
    comments.map(comment => this.mapToDTO(comment))
}
