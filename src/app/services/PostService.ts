import { config } from '../../config'
import { Post } from 'src/database/entities/Post'
import { PostMapper } from '../domain/mappers/PostMapper'
import { PostRepository } from '../repositories/PostRepository'
import { PostDTO } from '../domain/dtos/PostDTO'
import { ErrorHandler, statusCodes } from '../../infrastructure/http'
import { PostMessages } from '../utils/messages/PostMessages'
import { CommentService } from './CommentService'

export class PostService {
  constructor(
    private _postRepository: PostRepository,
    private _postMapper: PostMapper,
    private _commentsService: CommentService
  ) {}

  mapToEntity = async (postPayload: any): Promise<Post> =>
    this._postMapper.mapToEntity(postPayload)

  create = async (postEntity: Post): Promise<PostDTO> =>
    this._postRepository
      .save(postEntity)
      .then(post => this._postMapper.mapToDTO(post))

  getById = async (id: number) => this._postRepository.getById(id)

  postOnWall = async (query: {
    wallId: number
    page?: number
    perPage?: number
    userId?: number
  }) => {
    const { page, perPage, wallId, userId } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
      wallId,
    }
    const collection = await this._postRepository.postOnWall(options)

    const output = {
      posts: [] as PostDTO[],
      all: collection.all,
      pages: collection.pages,
      nextPage:
        options.page >= collection.pages
          ? false
          : parseInt(options.page as any) + 1,
    }

    if (userId && collection.rows[0]) {
      const likes = await this._postRepository.likesMany({
        userId,
        postsIds: collection.rows.map(post => post.id),
      })

      output.posts = this._postMapper.mapListWithLikesToDTO(
        collection.rows,
        likes
      )
    } else if (collection.rows[0]) {
      output.posts = this._postMapper.mapListToDTO(collection.rows)
    }

    return output
  }

  collection = async (query: {
    userId: number
    page?: number
    perPage?: number
  }) => {
    const { page, perPage, userId } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.POST_PER_PAGE,
      userId,
    }
    const collection = await this._postRepository.collection(options)

    if (!collection.rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        PostMessages.POST_NOT_FOUND
      )

    return {
      posts: this._postMapper.mapListToDTO(collection.rows),
      all: collection.all,
      pages: collection.pages,
      nextPage:
        options.page >= collection.pages
          ? false
          : parseInt(options.page as any) + 1,
    }
  }

  get = async (postId: number, userId?: number) => {
    const { comments, all, pages } = await this._commentsService.commentOnPost({
      postId,
    })
    let post = await this._postRepository
      .get(postId)
      .then(post => this._postMapper.mapToDTO(post as Post))

    if (!post)
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        PostMessages.POST_NOT_FOUND
      )

    if (userId) {
      const isLiked = await this._postRepository.isLiked(postId, userId)
      if (isLiked) post = { ...post, isLiked: true }
    }

    return {
      ...post,
      comments: {
        ...comments,
        all,
        pages,
      },
    }
  }

  relatedPosts = async (query: { page?: number; perPage?: number }) => {
    const { page, perPage } = query
    const collection = await this._postRepository.relatedPosts({
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
    })

    if (!collection.rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        PostMessages.POST_NOT_FOUND
      )

    return {
      posts: this._postMapper.mapListToDTO(collection.rows),
      all: collection.all,
      pages: collection.pages,
    }
  }

  like = async (postId: number, userId: number) =>
    this._postRepository.like(postId, userId)

  unlike = async (postId: number, userId: number) =>
    this._postRepository.unlike(postId, userId)

  delete = async (postId: number, userId: number) =>
    this._postRepository.delete(postId, userId).then(() => ({ postId, userId }))
}
