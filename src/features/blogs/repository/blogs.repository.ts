import { db } from '../../../db/in-memory.db'
import { BlogViewModel, BlogInputModel } from '../types/blogs.types'
import crypto from 'crypto'

export const blogsRepository = {
  findAll(): BlogViewModel[] {
    return db.blogs
  },
  findById(id: string): BlogViewModel | null {
    return db.blogs.find((blog) => blog.id === id) || null
  },
  create(blogInput: BlogInputModel) {
    const newBlog: BlogViewModel = {
      ...blogInput,
      id: crypto.randomUUID(),
    }

    db.blogs.push(newBlog)
    return newBlog
  },
  delete(id: string) {
    const index = db.blogs.findIndex((blog) => blog.id === id)

    if (index === -1) {
      throw new Error('Blog not exist')
    }

    db.blogs.splice(index, 1)
    return
  },
}
