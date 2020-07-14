import { Post } from 'src/database/entities/Post'
import { PostMapper } from '../domain/mappers/PostMapper'
import { PostRepository } from '../repositories/PostRepository'
import { PostDTO } from '../domain/dtos/PostDTO'

export class PostService {
  constructor(
    private _postRepository: PostRepository,
    private _postMapper: PostMapper,
  ) {}

  mapToEntity = async (postPayload: any): Promise<Post> =>
    await this._postMapper.mapToEntity(postPayload)

  create = async (postEntity: Post): Promise<PostDTO> =>
    await this._postRepository.save(postEntity)
      .then(post => this._postMapper.mapToDTO(post))

  getById = async (id: number) =>
    await this._postRepository.getById(id)
}
