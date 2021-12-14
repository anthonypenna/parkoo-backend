import { Schema } from 'mongoose'
import { CleaningDayMap } from './types'

export const cleaningDayMapSchema = new Schema<CleaningDayMap>({
  '0': {
    type: Boolean,
    required: true,
  },
  '1': {
    type: Boolean,
    required: true,
  },
  '2': {
    type: Boolean,
    required: true,
  },
  '3': {
    type: Boolean,
    required: true,
  },
  '4': {
    type: Boolean,
    required: true,
  },
  '5': {
    type: Boolean,
    required: true,
  },
  '6': {
    type: Boolean,
    required: true,
  },
})
