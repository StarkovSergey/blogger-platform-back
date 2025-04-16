import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { generateAdminBasicCredentials } from '../utils/generate-admin-basic-cred'
import { Paths } from '../../../src/core/paths/paths'

describe('Posts API body validation', () => {
  const app = express()
  setupApp(app)

  beforeEach(async () => {
    await clearDb(app)
  })

  it('return status 400 if title is not provided', async () => {
    const post = {
      shortDescription: 'Test Description',
      content: 'Test Content',
      blogId: 'test-blog-id',
    }

    const response = await request(app)
      .post(Paths.POSTS)
      .set('Authorization', generateAdminBasicCredentials())
      .send(post)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })

  it('return status 400 if title is too long', async () => {
    const post = {
      title: 'a'.repeat(100),
      shortDescription: 'Test Description',
      content: 'Test Content',
      blogId: 'test-blog-id',
    }

    const response = await request(app)
      .post(Paths.POSTS)
      .set('Authorization', generateAdminBasicCredentials())
      .send(post)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })

  it('return status 400 if shortDescription is not provided', async () => {
    const post = {
      title: 'Test Post',
      content: 'Test Content',
      blogId: 'test-blog-id',
    }

    const response = await request(app)
      .post(Paths.POSTS)
      .set('Authorization', generateAdminBasicCredentials())
      .send(post)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })

  it('return status 400 if content is not provided', async () => {
    const post = {
      title: 'Test Post',
      shortDescription: 'Test Description',
      blogId: 'test-blog-id',
    }

    const response = await request(app)
      .post(Paths.POSTS)
      .set('Authorization', generateAdminBasicCredentials())
      .send(post)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })

  it('return status 400 if blogId is not provided', async () => {
    const post = {
      title: 'Test Post',
      shortDescription: 'Test Description',
      content: 'Test Content',
    }

    const response = await request(app)
      .post(Paths.POSTS)
      .set('Authorization', generateAdminBasicCredentials())
      .send(post)
    expect(response.status).toBe(HttpStatus.BadRequest)
  })
})
