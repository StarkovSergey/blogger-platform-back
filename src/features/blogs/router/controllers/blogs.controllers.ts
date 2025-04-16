import { Request, Response } from 'express'
import { blogsRepository } from '../../repository/blogs.repository'
import { HttpStatus } from '../../../../core/types/http-statuses'

export function getBlogsController(req: Request, res: Response) {
  const blogs = blogsRepository.findAll()
  res.status(200).send(blogs)
}

export const getBlogByIdController = (req: Request, res: Response) => {
  const blog = blogsRepository.findById(req.params.id)

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  res.send(blog)
}

export const createBlogController = (req: Request, res: Response) => {
  const newBlog = blogsRepository.create(req.body)
  res.status(HttpStatus.Created).send(newBlog)
}

export const deleteBlogController = (req: Request, res: Response) => {
  const id = req.params.id
  const blog = blogsRepository.findById(id)

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  blogsRepository.delete(id)
  res.sendStatus(HttpStatus.NoContent)
}

export const updateBlogController = (req: Request, res: Response) => {
  const id = req.params.id
  const blog = blogsRepository.findById(id)

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  blogsRepository.update(id, req.body)
  res.sendStatus(HttpStatus.NoContent)
}
