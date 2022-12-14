import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4003/graphql',
  cache: new InMemoryCache(),
});
