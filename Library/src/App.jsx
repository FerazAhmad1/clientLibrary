/* eslint-disable no-unused-vars */
import LoginSignup from "./components/LoginSignup";
import "./App.css";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail.jsx";
import {ApolloClient,InMemoryCache,ApolloProvider,HttpLink,from} from "@apollo/client"
import {onError} from '@apollo/client/link/error'
function App() {
  return (
    <>
      <LoginSignup />
      {/* <Navbar />*/}
      {/* <Product /> */}
      {/* <ProductDetail /> */}
    </>
  );
}

export default App;
