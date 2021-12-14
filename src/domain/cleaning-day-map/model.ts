import { model } from 'mongoose'
import { cleaningDayMapSchema } from './schema'
import { CleaningDayMap } from './types'

export const cleaningDayMapModel = model<CleaningDayMap>(
  'CleaningDayMap',
  cleaningDayMapSchema
)
