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

export const READ_CART = gql`
  query ReadCart {
    readCart {
      grandTotal
      cartItem {
        id
        title
        price
        quantity
        duration
        author
        total
        isBorrowed
      }
    }
  }
`;
