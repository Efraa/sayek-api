import { createConnection, Connection } from 'typeorm'

let instance: Connection|undefined = undefined
export const DatabaseConnection = {
  connect: async () => !instance ?
    (instance = await createConnection()) : instance
}
