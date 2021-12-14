import { Schema } from 'mongoose'
import { cleaningDayMapSchema } from '../cleaning-day-map/schema'
import { Street } from './types'

export const streetSchema = new Schema<Street>({
  cleaningDays: {
    type: cleaningDayMapSchema,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
})
