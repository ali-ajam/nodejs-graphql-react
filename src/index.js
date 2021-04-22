import React from 'react';
import ReactDOM from 'react-dom';
// react library for routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// core styles
import 'assets/scss/styles.scss';
import AdminLayout from 'layouts/Admin.js';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL Error ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:8080/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route path='/' render={() => <AdminLayout />} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
