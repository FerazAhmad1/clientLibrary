import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      success
      token
      error
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN_HANDLER = gql`
  mutation LoginHandler($email: String!, $password: String!) {
    loginHandler(email: $email, password: $password) {
      success
      token
      error
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $quantity: Int!
    $price: Int!
  ) {
    createbook(
      title: $title
      author: $author
      quantity: $quantity
      price: $price
    ) {
      id
      title
      quantity
      error
    }
  }
`;
export const SEARCH_BOOK = gql`
  mutation SearchBook($query: String!) {
    searchBook(query: $query) {
      available
      error
      Book {
        id
        title
        quantity
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart(
    $id: ID!
    $quantity: Int!
    $isBorrowed: Boolean!
    $duration: String!
  ) {
    addToCart(
      id: $id
      quantity: $quantity
      isBorrowed: $isBorrowed
      duration: $duration
    ) {
      success
      error
      cartItem {
        id
        quantity
        title
      }
    }
  }
`;
