import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
} from '../../../src/auth/auth-admin-middleware'

export const generateAdminBasicCredentials = () => {
  const credentials = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`
  const base64Credentials = Buffer.from(credentials).toString('base64')
  return `Basic ${base64Credentials}`
}
