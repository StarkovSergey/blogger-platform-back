import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/features/core/types/http-statuses'

describe('Blogs API', () => {
  const app = express()
  setupApp(app)

  beforeAll(async () => {
    await clearDb(app)
  })

  it('should return all blogs', async () => {
    const response = await request(app).get('/blogs')
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toEqual([])
  })
})
