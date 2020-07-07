import { ValueTransformer } from 'typeorm'

export const capitalize: ValueTransformer = {
  to: (string: string) => {
    if (string && typeof string === 'string') return string.toLocaleLowerCase()

    return string
  },
  from: (databaseValue: string) => databaseValue &&
    `${databaseValue.charAt(0).toUpperCase()}${databaseValue.slice(1)}`,
}
