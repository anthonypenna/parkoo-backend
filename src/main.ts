import { until } from '@open-draft/until'
import express, { json } from 'express'
import cors from 'cors'
import { loadEnv } from './env'
import { connectDB } from './db'
import { PORT } from './config'
import { getStreetsController } from './domain/street/controller'

async function main() {
  const [error] = await until(() => Promise.all([loadEnv(), connectDB()]))

  if (error) {
    console.log(error)
    return
  }

  const app = express().use(cors(), json())

  app.get('/api/v1/streets', getStreetsController)

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}

main()
