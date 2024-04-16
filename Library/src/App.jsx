/* eslint-disable no-unused-vars */
import LoginSignup from "./components/LoginSignup";
import "./App.css";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message} `);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <LoginSignup />
      </ApolloProvider>

      {/* <Navbar />*/}
      {/* <Product /> */}
      {/* <ProductDetail /> */}
    </>
  );
}

export default App;
