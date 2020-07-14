import { Mapper } from 'ts-simple-automapper'
import { Post } from '../../../database/entities/Post'
import { PostRepository } from '../../repositories/PostRepository'
import { PostDTO } from '../dtos/PostDTO'

export class PostMapper {
  constructor(
    private _postRepository: PostRepository,
  ) {}

  public mapToDTO(from: Post): PostDTO {
    const postDTO: PostDTO = new Mapper().map(from, new PostDTO())
    return postDTO
  }

  public mapToEntity = async (from: any): Promise<Post> =>
    await this._postRepository.create(from)

  public mapListToDTO(posts: Post[]): PostDTO[] {
    return posts.map(post => this.mapToDTO(post))
  }
}
