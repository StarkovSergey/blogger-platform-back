import { Router } from 'express'

export const postsRouter = Router({})

postsRouter.get('', (req, res) => {
  console.log('GET /post request received')
  res.status(200).send([1, 2, 3])
})
