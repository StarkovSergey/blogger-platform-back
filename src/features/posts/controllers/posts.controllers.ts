import { Request, Response } from 'express'
import { postsRepository } from '../repository/posts.repository'
import { HttpStatus } from '../../../core/types/http-statuses'
import { blogsRepository } from '../../blogs/repository/blogs.repository'

export function getPostsController(req: Request, res: Response) {
  const posts = postsRepository.findAll()
  res.status(200).send(posts)
}

export const getPostByIdController = (req: Request, res: Response) => {
  const post = postsRepository.findById(req.params.id)

  if (!post) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  res.send(post)
}

export const createPostController = (req: Request, res: Response) => {
  const blog = blogsRepository.findById(req.body.blogId)

  if (!blog) {
    res.sendStatus(HttpStatus.BadRequest)
    return
  }

  const newPost = postsRepository.create(req.body)
  res.status(HttpStatus.Created).send(newPost)
}

export const deletePostController = (req: Request, res: Response) => {
  const id = req.params.id
  const post = postsRepository.findById(id)

  if (!post) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  postsRepository.delete(id)
  res.sendStatus(HttpStatus.NoContent)
}

export const updatePostController = (req: Request, res: Response) => {
  const id = req.params.id
  const post = postsRepository.findById(id)

  if (!post) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  postsRepository.update(id, req.body)
  res.sendStatus(HttpStatus.NoContent)
}
