import { Mapper } from 'ts-simple-automapper'
import { Comment } from '../../../database/entities/Comment'
import { CommentRepository } from '../../repositories/CommentRepository'
import { CommentDTO } from '../dtos/CommentDTO'

export class CommentMapper {
  constructor(
    private _commentRepository: CommentRepository,
  ) {}

  public mapToDTO(from: Comment): CommentDTO {
    const commentDTO: CommentDTO = new Mapper().map(from, new CommentDTO())
    return commentDTO
  }

  public mapToEntity = async (from: any): Promise<Comment> =>
    await this._commentRepository.create(from)

  public mapListToDTO(comments: Comment[]): CommentDTO[] {
    return comments.map(comment => this.mapToDTO(comment))
  }
}
