import request from 'supertest'
import { Express } from 'express'
import { Paths } from '../../../../src/core/paths/paths'
import { HttpStatus } from '../../../../src/core/types/http-statuses'

export const getPostById = async (app: Express, postId: string) => {
  const response = await request(app)
    .get(`${Paths.POSTS}/${postId}`)
    .expect(HttpStatus.OK)

  return response.body
}
