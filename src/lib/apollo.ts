import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, NormalizedCacheObject } from "@apollo/client"
import { cache } from "./cache"

export const typeDefs = gql`
  extend type Query {
    zoneID: Int!
  }
`

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  typeDefs,
})
