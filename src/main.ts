import { until } from '@open-draft/until'
import express, { json } from 'express'
import cors from 'cors'
import { loadEnv } from './env'
import { connectDB } from './db'
import { ALLOWED_ORIGIN, PORT } from './config'
import {
  createStreetController,
  getStreetsController,
} from './domain/street/controller'

async function main() {
  const [error] = await until(() => Promise.all([loadEnv(), connectDB()]))

  if (error) {
    console.log(error)
    return
  }

  const app = express().use(cors({ origin: ALLOWED_ORIGIN }), json())

  app.get('/api/v1/streets', getStreetsController)
  app.post('/api/v1/street', createStreetController)

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}

main()
