import { connectDB } from '@/db'
import { until } from '@open-draft/until'
import * as Mongoose from 'mongoose'

jest.mock('mongoose')

describe('connectDB', () => {
  describe('when an error occurs', () => {
    it('should throw the error', async () => {
      jest.spyOn(Mongoose, 'connect').mockRejectedValue({ message: 'Error!' })

      const [error] = await until(connectDB)
      expect(error).toEqual({ message: 'Error!' })
    })
  })

  it('should connect to the database', async () => {
    const connect = jest
      .spyOn(Mongoose, 'connect')
      .mockResolvedValue({} as typeof Mongoose)

    await connectDB()
    expect(connect).toHaveBeenCalledWith(
      'mongodb+srv://username:password@host/db?retryWrites=true&w=majority'
    )
  })
})
