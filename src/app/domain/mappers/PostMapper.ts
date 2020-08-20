import { Mapper } from 'ts-simple-automapper'
import { Post } from '../../../database/entities/Post'
import { PostRepository } from '../../repositories/PostRepository'
import { PostDTO } from '../dtos/PostDTO'
import { ICollection, IDocument } from './Interfaces'

export class PostMapper {
  private mapper = new Mapper()
  private dto = new PostDTO()

  constructor(private _postRepository: PostRepository) {}

  mapToDTO = ({
    meta,
    comments,
    user,
    metaUserLogged,
    ...payload
  }: any): IDocument => {
    const data = this.mapper.map(payload, this.dto)
    const relationships = {
      user,
      comments,
    }

    return {
      type: 'post',
      data,
      meta,
      relationships,
      metaUserLogged,
    }
  }

  mapToEntity = async (from: any): Promise<Post> =>
    this._postRepository.create(from)

  mapListToDTO = (posts: Post[]): PostDTO[] =>
    this.mapper.mapList(posts, PostDTO)

  // mapListWithLikesToDTO = (posts: Post[], likes: Post[]): PostDTO[] =>
  //   posts.map(p =>
  //     likes.find(l => l.id === p.id)
  //       ? this.mapToDTO({
  //           ...p,
  //           included: {
  //             userLogged: {
  //               liked: true,
  //             },
  //           },
  //         } as Post)
  //       : this.mapToDTO(p)
  //   )
}
