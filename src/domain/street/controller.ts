import { until } from '@open-draft/until'
import { Request, Response } from 'express'
import { streetModel } from './model'
import { TypedRequest } from '@/types'
import { Street } from './types'

export async function getStreetsController(_: Request, res: Response) {
  const [error, streets] = await until(() => streetModel.find().exec())
  if (error) throw error
  res.status(200).json({ streets })
}

export async function createStreetController(
  req: TypedRequest<Street>,
  res: Response
) {
  const [error, street] = await until(() =>
    streetModel.findOne({ id: req.body.id }).exec()
  )

  if (error) throw error
  if (street)
    return res
      .status(400)
      .json({ message: 'A street with that ID already exists' })

  const newStreet = await streetModel.create(req.body)
  await newStreet.save()
  res.status(201).json({ street: req.body })
}
