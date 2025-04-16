import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { createBlog } from './utils/createBlog'
import { getBlogById } from './utils/getBlogById'
import { generateAdminBasicCredentials } from '../utils/generate-admin-basic-cred'
import { Paths } from '../../../src/core/paths/paths'

describe('Blogs API', () => {
  const app = express()
  setupApp(app)

  beforeEach(async () => {
    await clearDb(app)
  })

  it('returns empty array', async () => {
    const response = await request(app).get(Paths.BLOGS)
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

    const response = await request(app).get(Paths.BLOGS)
    expect(response.body.length).toBe(1)
  })

  it('return blog by ID', async () => {
    const createdBlog = await createBlog(app)

    await getBlogById(app, createdBlog.id)
  })

  it('delete blog and check after "NOT FOUND"', async () => {
    const createdBlog = await createBlog(app)

    await request(app)
      .delete(`${Paths.BLOGS}/${createdBlog.id}`)
      .set('Authorization', generateAdminBasicCredentials())
      .expect(HttpStatus.NoContent)

    await request(app)
      .get(`${Paths.BLOGS}/${createdBlog.id}`)
      .expect(HttpStatus.NotFound)
  })

  it('update blog', async () => {
    const createdBlog = await createBlog(app)

    const updatedBlogModel = {
      name: 'Updated Blog',
      description: 'Updated Description',
      websiteUrl: 'https://updated.com',
    }

    await request(app)
      .put(`${Paths.BLOGS}/${createdBlog.id}`)
      .set('Authorization', generateAdminBasicCredentials())
      .send(updatedBlogModel)
      .expect(HttpStatus.NoContent)

    const updatedBlog = await getBlogById(app, createdBlog.id)
    expect(updatedBlog).toEqual({
      ...updatedBlogModel,
      id: createdBlog.id,
    })
  })
})
