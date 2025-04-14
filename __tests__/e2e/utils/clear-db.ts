import request from 'supertest'
import { Express } from 'express'
import { HttpStatus } from '../../../src/features/core/types/http-statuses'

export async function clearDb(app: Express) {
  await request(app).delete(`/testing/all-data`).expect(HttpStatus.NoContent)
}
