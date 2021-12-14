import { CleaningDayMap } from '../cleaning-day-map/types'

export interface Street {
  id: string
  lat: number
  lng: number
  cleaningDays: CleaningDayMap
}
