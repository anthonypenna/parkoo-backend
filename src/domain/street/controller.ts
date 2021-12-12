import { until } from '@open-draft/until'
import { Request, Response } from 'express'
import { streetModel } from './model'

export async function getStreetsController(_: Request, res: Response) {
  const [error, streets] = await until(() => streetModel.find().exec())

  if (error) throw error

  res.status(200).json({ streets })
}
