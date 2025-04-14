import { db } from '../../../db/in-memory.db'
import { BlogViewModel } from '../types/blogs.types'

export const blogsRepository = {
  findAll(): BlogViewModel[] {
    return db.blogs
  },
}
