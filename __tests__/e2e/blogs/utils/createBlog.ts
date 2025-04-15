import { Express } from 'express'
import request from 'supertest'
import { HttpStatus } from '../../../../src/core/types/http-statuses'
import { BlogInputModel } from '../../../../src/features/blogs/types/blogs.types'

export async function createBlog(app: Express, blogDto?: BlogInputModel) {
  const testBlog = blogDto ?? {
    name: 'Test Blog',
    description: 'Test Description',
    websiteUrl: 'https://test.com',
  }

  await request(app).post('/blogs').send(testBlog).expect(HttpStatus.Created)
}
