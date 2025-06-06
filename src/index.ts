import express from 'express'
import { setupApp } from './setup-app'
import 'dotenv/config'

const app = express()
setupApp(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Blog Platform app listening on port ${PORT}`)
})
