import { until } from '@open-draft/until'
import { connect } from 'mongoose'
import { MONGO_URI } from '../config'

export async function connectDB() {
  const [error] = await until(() => connect(MONGO_URI))
  if (error) throw error
}
