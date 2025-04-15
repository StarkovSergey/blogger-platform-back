import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { createBlog } from './utils/createBlog'

describe('Blogs API', () => {
  const app = express()
  setupApp(app)

  beforeEach(async () => {
    await clearDb(app)
  })

  it('returns empty array', async () => {
    const response = await request(app).get('/blogs')
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toEqual([])
  })

  it('create blog', async () => {
    const blog = {
      name: 'Test Blog',
      description: 'Test Description',
      websiteUrl: 'https://test.com',
    }

    createBlog(app, blog)

    const response = await request(app).get('/blogs')
    expect(response.body.length).toBe(1)
  })
})
