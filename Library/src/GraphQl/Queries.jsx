import { gql } from "@apollo/client";

export const READ_BOOK = gql`
  query ReadBook($id: ID!) {
    readBook(id: $id) {
      id
      title
      quantity
      author
      price
      error
    }
  }
`;
