import { db } from '../../../db/in-memory.db'
import { BlogViewModel, BlogInputModel } from '../types/blogs.types'
import crypto from 'crypto'

export const blogsRepository = {
  findAll(): BlogViewModel[] {
    return db.blogs
  },
  create(blogInput: BlogInputModel) {
    const newBlog: BlogViewModel = {
      ...blogInput,
      id: crypto.randomUUID(),
    }

    db.blogs.push(newBlog)
    return newBlog
  },
}
