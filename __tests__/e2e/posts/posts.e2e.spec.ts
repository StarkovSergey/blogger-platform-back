import request from 'supertest'
import express from 'express'
import { setupApp } from '../../../src/setup-app'
import { clearDb } from '../utils/clear-db'
import { HttpStatus } from '../../../src/core/types/http-statuses'
import { createPost } from './utils/createPost'
import { getPostById } from './utils/getPostById'
import { generateAdminBasicCredentials } from '../utils/generate-admin-basic-cred'
import { Paths } from '../../../src/core/paths/paths'

describe('Posts API', () => {
  const app = express()
  setupApp(app)

  beforeEach(async () => {
    await clearDb(app)
  })

  it('returns empty array', async () => {
    const response = await request(app).get(Paths.POSTS)
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toEqual([])
  })

  it('create post', async () => {
    const post = {
      title: 'Test Post',
      shortDescription: 'Test Description',
      content: 'Test Content',
    }

    await createPost(app, post)

    const response = await request(app).get(Paths.POSTS)
    expect(response.body.length).toBe(1)
  })

  it('return post by ID', async () => {
    const createdPost = await createPost(app)

    await getPostById(app, createdPost.id)
  })

  it('delete post and check after "NOT FOUND"', async () => {
    const createdPost = await createPost(app)

    await request(app)
      .delete(`${Paths.POSTS}/${createdPost.id}`)
      .set('Authorization', generateAdminBasicCredentials())
      .expect(HttpStatus.NoContent)

    await request(app)
      .get(`${Paths.POSTS}/${createdPost.id}`)
      .expect(HttpStatus.NotFound)
  })

  it('update post', async () => {
    const createdPost = await createPost(app)

    const updatedPostModel = {
      title: 'Updated Post',
      shortDescription: 'Updated Description',
      content: 'Updated Content',
      blogId: createdPost.blogId,
      blogName: createdPost.blogName,
    }

    await request(app)
      .put(`${Paths.POSTS}/${createdPost.id}`)
      .set('Authorization', generateAdminBasicCredentials())
      .send(updatedPostModel)
      .expect(HttpStatus.NoContent)

    const updatedPost = await getPostById(app, createdPost.id)
    expect(updatedPost).toEqual({
      ...updatedPostModel,
      id: createdPost.id,
    })
  })
})
