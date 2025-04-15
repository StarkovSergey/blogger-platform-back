import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { createBlog } from './utils/createBlog'
import { getBlogById } from './utils/getBlogById'

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

  it('return blog by ID', async () => {
    const createdBlog = await createBlog(app)

    const foundBlog = await getBlogById(app, createdBlog.id)
  })

  it('delete blog and check after "NOT FOUND"', async () => {
    const createdBlog = await createBlog(app)

    await request(app)
      .delete(`/blogs/${createdBlog.id}`)
      .expect(HttpStatus.NoContent)

    await request(app)
      .get(`/blogs/${createdBlog.id}`)
      .expect(HttpStatus.NotFound)
  })
})
