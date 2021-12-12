import { until } from '@open-draft/until'
import { connect } from 'mongoose'
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config'

export async function connectDB() {
  const [error] = await until(() =>
    connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`)
  )

  if (error) throw error
}
