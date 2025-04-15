import request from 'supertest'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { Express } from 'express'

export const clearDb = async (app: Express) => {
  await request(app).delete(`/testing/all-data`).expect(HttpStatus.NoContent)
}
