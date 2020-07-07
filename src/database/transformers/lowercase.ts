import { ValueTransformer } from 'typeorm'

export const lowercase: ValueTransformer = {
  to: (string: string) => {
    if (string && typeof string === 'string') return string.toLocaleLowerCase()

    return string
  },
  from: (databaseValue: string) => databaseValue
}
