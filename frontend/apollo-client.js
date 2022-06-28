import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '{{BACKEND URL GOES HERE}}',
  cache: new InMemoryCache(),
})

export default client
