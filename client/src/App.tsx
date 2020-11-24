import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// components
import BookList from './components/bookList';
import Footer from './components/footer';


//apollo setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});


const App = () => {


  return(
    <div>
      <ApolloProvider client={client}>
        
        <BookList />

        <Footer />

      </ApolloProvider>
    </div>
  )
}

export default App;
