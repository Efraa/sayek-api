import { ValueTransformer } from 'typeorm'

export const encode: ValueTransformer = {
  to: (entityValue: string) => encodeURI(entityValue),
  from: (databaseValue: string) => decodeURI(databaseValue),
}
