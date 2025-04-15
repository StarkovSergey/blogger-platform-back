import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { createBlog } from './utils/createBlog'
import { generateAdminBasicCredentials } from '../utils/generate-admin-basic-cred'

describe('Blogs API body validation', () => {
  const app = express()
  setupApp(app)

  beforeEach(async () => {
    await clearDb(app)
  })

  it('return status 400 if name is not provided', async () => {
    const blog = {
      description: 'Test Description',
      websiteUrl: 'https://test.com',
    }

    const response = await request(app)
      .post('/blogs')
      .set('Authorization', generateAdminBasicCredentials())
      .send(blog)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })

  it('return status 400 if name is too long', async () => {
    const blog = {
      name: 'a'.repeat(100),
      description: 'Test Description',
      websiteUrl: 'https://test.com',
    }

    const response = await request(app)
      .post('/blogs')
      .set('Authorization', generateAdminBasicCredentials())
      .send(blog)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })
})
