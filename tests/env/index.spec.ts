import { loadEnv } from '@/env'
import dotenv from 'dotenv'

jest.mock('dotenv')

describe('loadEnv', () => {
  it('should load environment variables', () => {
    const config = jest.spyOn(dotenv, 'config')
    loadEnv()
    expect(config).toHaveBeenCalledWith({ path: '.env' })
  })
})
