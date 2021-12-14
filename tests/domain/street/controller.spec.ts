import {
  createStreetController,
  getStreetsController,
} from '@/domain/street/controller'
import { streetModel } from '@/domain/street/model'
import { Street } from '@/domain/street/types'
import { TypedRequest } from '@/types'
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

describe('createStreetController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when an error occurs', () => {
    it('should throw', async () => {
      jest.spyOn<any, any>(streetModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockRejectedValue({ message: 'Error!' }),
      })

      const req = { body: { id: '' } } as unknown as TypedRequest<Street>
      const res = {} as unknown as Response
      const [error] = await until(() => createStreetController(req, res))
      expect(error).toEqual({ message: 'Error!' })
    })
  })

  describe('when the street already exists', () => {
    it('should respond with a 400 status code', async () => {
      jest.spyOn<any, any>(streetModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      })

      const street = { id: '' } as Street
      const req = { body: street } as unknown as TypedRequest<Street>

      const json = jest.fn()
      const status = jest.fn().mockReturnValue({ json })
      const res = { status } as unknown as Response

      await until(() => createStreetController(req, res))
      expect(status).toHaveBeenCalledWith(400)
    })

    it('should respond with the correct json', async () => {
      jest.spyOn<any, any>(streetModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      })

      const street = { id: '' } as Street
      const req = { body: street } as unknown as TypedRequest<Street>

      const json = jest.fn()
      const status = jest.fn().mockReturnValue({ json })
      const res = { status } as unknown as Response

      await until(() => createStreetController(req, res))
      expect(json).toHaveBeenCalledWith({
        message: 'A street with that ID already exists',
      })
    })
  })

  describe('when the street doesnt exist', () => {
    it('should create a new one', async () => {
      const save = jest.fn()

      jest.spyOn<any, any>(streetModel, 'create').mockResolvedValue({ save })

      jest.spyOn<any, any>(streetModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      })

      const street = { id: '', lat: 45, lng: 9, cleaningDays: {} } as Street
      const req = { body: street } as unknown as TypedRequest<Street>
      const res = {} as unknown as Response

      await until(() => createStreetController(req, res))
      expect(streetModel.create).toHaveBeenCalledWith(street)
      expect(save).toHaveBeenCalled()
    })

    it('should respond with a status code 201', async () => {
      jest.spyOn<any, any>(streetModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      })

      const street = { id: '', lat: 45, lng: 9, cleaningDays: {} } as Street
      const req = { body: street } as unknown as TypedRequest<Street>

      const json = jest.fn()
      const status = jest.fn().mockReturnValue({ json })
      const res = { status } as unknown as Response

      await until(() => createStreetController(req, res))
      expect(status).toHaveBeenCalledWith(201)
    })

    it('should respond with the correct json', async () => {
      jest.spyOn<any, any>(streetModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      })

      const street = { id: '', lat: 45, lng: 9, cleaningDays: {} } as Street
      const req = { body: street } as unknown as TypedRequest<Street>

      const json = jest.fn()
      const status = jest.fn().mockReturnValue({ json })
      const res = { status } as unknown as Response

      await until(() => createStreetController(req, res))
      expect(json).toHaveBeenCalledWith({ street: req.body })
    })
  })
})
