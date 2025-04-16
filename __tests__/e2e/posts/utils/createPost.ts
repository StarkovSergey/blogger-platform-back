import request from 'supertest'
import { Express } from 'express'
import { generateAdminBasicCredentials } from '../../utils/generate-admin-basic-cred'
import { Paths } from '../../../../src/core/paths/paths'
import { HttpStatus } from '../../../../src/core/types/http-statuses'
import { createBlog } from '../../blogs/utils/createBlog'

export const createPost = async (
  app: Express,
  postData?: {
    title: string
    shortDescription: string
    content: string
    blogId?: string
  },
) => {
  const blog = await createBlog(app)

  const defaultPost = {
    title: postData?.title || 'Test Post',
    shortDescription: postData?.shortDescription || 'Test Description',
    content: postData?.content || 'Test Content',
    blogId: postData?.blogId || blog.id,
  }

  const response = await request(app)
    .post(Paths.POSTS)
    .set('Authorization', generateAdminBasicCredentials())
    .send(defaultPost)
    .expect(HttpStatus.Created)

  return response.body
}
