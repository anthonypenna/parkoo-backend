import { getStreetsController } from '@/domain/street/controller'
import { streetModel } from '@/domain/street/model'
import { until } from '@open-draft/until'
import { Request, Response } from 'express'

jest.mock('@/domain/street/model')

describe('getStreetsController', () => {
  let json: any
  let status: any
  let req: Request
  let res: Response

  beforeEach(() => {
    json = jest.fn()
    status = jest.fn(() => ({ json }))
    req = {} as unknown as Request
    res = { json, status } as unknown as Response
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when an error occurs', () => {
    it('should throw the error', async () => {
      jest.spyOn<any, any>(streetModel, 'find').mockReturnValue({
        exec: jest.fn().mockRejectedValue({ message: 'Cannot' }),
      })

      const [error] = await until(() => getStreetsController(req, res))
      expect(error).toEqual({ message: 'Cannot' })
    })
  })

  describe('when there are no streets', () => {
    it('should return the correct status code', async () => {
      jest.spyOn<any, any>(streetModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      })

      await getStreetsController(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('should return the correct json', async () => {
      jest.spyOn<any, any>(streetModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      })

      await getStreetsController(req, res)
      expect(res.json).toHaveBeenCalledWith({ streets: [] })
    })
  })

  describe('when there are streets', () => {
    it('should return the correct status code', () => {
      jest.spyOn<any, any>(streetModel, 'find').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValue([{ cleaningDays: [], lat: 0, lng: 0 }]),
      })
    })
  })
})
