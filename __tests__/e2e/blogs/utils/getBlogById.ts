import request from 'supertest'
import { Express } from 'express'
import { BlogViewModel } from '../../../../src/features/blogs/types/blogs.types'
import { HttpStatus } from '../../../../src/core/types/http-statuses'
import { Paths } from '../../../../src/core/paths/paths'
export async function getBlogById(
  app: Express,
  blogId: string,
): Promise<BlogViewModel> {
  const response = await request(app)
    .get(`${Paths.BLOGS}/${blogId}`)
    .expect(HttpStatus.OK)

  return response.body
}
