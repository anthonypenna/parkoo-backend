import { Request } from 'express'

export type TypedRequest<B = unknown, P = unknown> = Request & {
  body: B
  params: P
}
