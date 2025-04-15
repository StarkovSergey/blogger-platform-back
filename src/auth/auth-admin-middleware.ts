import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../core/types/http-statuses'

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty'

export const authAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers['authorization']

  if (!auth) {
    res.sendStatus(HttpStatus.Unauthorized)
    return
  }

  const [authType, base64Credentials] = auth.split(' ')

  if (authType !== 'Basic') {
    res.sendStatus(HttpStatus.Unauthorized)
    return
  }

  /**
   * 1. Buffer.from(base64, 'base64') — декодирует строку из base64 в бинарный буфер
   * 2. .toString('utf-8') — превращает буфер в строку UTF-8
   */
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8') // admin:qwerty
  const [username, password] = credentials.split(':')

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.sendStatus(HttpStatus.Unauthorized)
  }

  next()
}
