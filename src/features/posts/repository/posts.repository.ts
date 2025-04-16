import { db } from '../../../db/in-memory.db'
import { PostViewModel, PostInputModel } from '../types/posts.types'
import crypto from 'crypto'

export const postsRepository = {
  findAll(): PostViewModel[] {
    return db.posts
  },
  findById(id: string): PostViewModel | null {
    return db.posts.find((post) => post.id === id) || null
  },
  create(postInputModel: PostInputModel) {
    const blog = db.blogs.find((blog) => blog.id === postInputModel.blogId)

    if (!blog) {
      throw new Error('Blog not exist')
    }

    const newPost: PostViewModel = {
      ...postInputModel,
      blogName: blog.name,
      id: crypto.randomUUID(),
    }

    db.posts.push(newPost)
    return newPost
  },
  delete(id: string) {
    const index = db.posts.findIndex((post) => post.id === id)

    if (index === -1) {
      throw new Error('Post not exist')
    }

    db.blogs.splice(index, 1)
    return
  },
  update(id: string, dto: PostInputModel) {
    const post = db.posts.find((p) => p.id === id)

    if (!post) {
      throw new Error('Post not exist')
    }

    const updatedPost = {
      ...dto,
    }

    Object.assign(post, updatedPost)

    return
  },
}
