import { Request } from 'express'

export interface TypedRequest<B = unknown, P = unknown>
  extends Request<unknown> {
  body: B
  params: P
}
