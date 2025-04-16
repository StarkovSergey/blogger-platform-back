import request from 'supertest'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { Express } from 'express'
import { Paths } from '../../../src/core/paths/paths'

export const clearDb = async (app: Express) => {
  await request(app)
    .delete(`${Paths.TESTING}/all-data`)
    .expect(HttpStatus.NoContent)
}
