import { Router } from 'express'
import { db } from '../../../db/in-memory.db'
import { HttpStatus } from '../../core/types/http-statuses'

export const testingRouter = Router()

testingRouter.delete('/all-data', (req, res) => {
  db.blogs = []
  res.sendStatus(HttpStatus.NoContent)
})
