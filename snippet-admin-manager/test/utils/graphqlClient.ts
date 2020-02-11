import 'cross-fetch/polyfill'
import ApolloClient from 'apollo-boost';

export const graphqlClient = new ApolloClient({
  uri: 'http://localhost:9001/graphql',
  onError: (e) => { console.log(e) },
});
