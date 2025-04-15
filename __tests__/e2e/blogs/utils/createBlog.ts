import { Express } from 'express'
import request from 'supertest'
import { HttpStatus } from '../../../../src/core/types/http-statuses'
import {
  BlogInputModel,
  BlogViewModel,
} from '../../../../src/features/blogs/types/blogs.types'

export async function createBlog(
  app: Express,
  blogDto?: any,
): Promise<BlogViewModel> {
  const testBlog = blogDto ?? {
    name: 'Test Blog',
    description: 'Test Description',
    websiteUrl: 'https://test.com',
  }

  const createdBlog = await request(app)
    .post('/blogs')
    .send(testBlog)
    .expect(HttpStatus.Created)
  return createdBlog.body
}
