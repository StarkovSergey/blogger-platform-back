import request from 'supertest'
import { Express } from 'express'
import { generateAdminBasicCredentials } from '../../utils/generate-admin-basic-cred'
import { Paths } from '../../../../src/core/paths/paths'
import { HttpStatus } from '../../../../src/core/types/http-statuses'

export const createPost = async (
  app: Express,
  postData?: {
    title: string
    shortDescription: string
    content: string
    blogId: string
  },
) => {
  const defaultPost = {
    title: 'Test Post',
    shortDescription: 'Test Description',
    content: 'Test Content',
    blogId: 'test-blog-id',
  }

  const response = await request(app)
    .post(Paths.POSTS)
    .set('Authorization', generateAdminBasicCredentials())
    .send(postData || defaultPost)
    .expect(HttpStatus.Created)

  return response.body
}
