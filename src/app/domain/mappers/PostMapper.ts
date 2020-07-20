import { Mapper } from 'ts-simple-automapper'
import { Post } from '../../../database/entities/Post'
import { PostRepository } from '../../repositories/PostRepository'
import { PostDTO } from '../dtos/PostDTO'

export class PostMapper {
  constructor(private _postRepository: PostRepository) {}

  mapToDTO(from: Post): PostDTO {
    const postDTO: PostDTO = new Mapper().map(from, new PostDTO())
    return postDTO
  }

  mapToEntity = async (from: any): Promise<Post> =>
    this._postRepository.create(from)

  mapListToDTO = (posts: Post[]): PostDTO[] =>
    posts.map(post => this.mapToDTO(post))

  mapListWithLikesToDTO = (posts: Post[], likes: Post[]): PostDTO[] =>
    posts.map(p =>
      likes.find(l => l.id === p.id)
        ? this.mapToDTO({ ...p, isLiked: true } as Post)
        : this.mapToDTO(p)
    )
}
