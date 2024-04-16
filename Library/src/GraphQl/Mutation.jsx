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
