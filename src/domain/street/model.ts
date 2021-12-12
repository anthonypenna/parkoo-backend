import { model } from 'mongoose'
import { streetSchema } from './schema'
import { Street } from './types'

export const streetModel = model<Street>('Street', streetSchema)
