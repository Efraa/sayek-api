import { config } from '../../config'

const blacklist = ['', `${config.AGENT_CLIENT}/logout`]

export const clientURI = (uri: string): string =>
  blacklist.includes(uri) ? (config.AGENT_CLIENT as string) : uri
