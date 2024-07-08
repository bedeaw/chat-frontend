import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8000/graphql/' }),
  cache: new InMemoryCache(),
});

const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloProviderWrapper;
