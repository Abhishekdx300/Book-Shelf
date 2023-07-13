import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import React from "react";
import "./App.css";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>BookList</h1>
      <BookList />
      <AddBook/>
    </ApolloProvider>
  );
};

export default App;
