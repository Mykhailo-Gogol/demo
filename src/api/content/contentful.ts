import { createClient, CreateClientParams } from 'contentful'

const config: CreateClientParams = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_CDA_ACCESS_TOKEN || '',
}

const client = createClient(config)

export default client
