import dotenv from 'dotenv'

export function loadEnv() {
  dotenv.config({ path: '.env.local' })
}
