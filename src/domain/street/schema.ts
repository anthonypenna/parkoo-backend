import { Schema } from 'mongoose'
import { Street } from './types'

export const streetSchema = new Schema<Street>({
  cleaningDays: {
    type: [Number],
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
