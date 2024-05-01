/* eslint-disable no-unused-vars */
import CartItem from "./CartItem.jsx";
import { useQuery } from "@apollo/client";
import { READ_CART } from "../GraphQl/Queries";
import { useSelector } from "react-redux";
import { authState } from "../features/authentication/authSlice.jsx";
const Bag = () => {
  console.log("yesssssssssss");
  const { token } = useSelector(authState);
  const { loading, error, data } = useQuery(READ_CART, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  if (loading) return <div />;
  if (error) return <div />;
  const cartItem = data.readCart.cartItem;
  const total = data.readCart.grandTotal;
  console.log(total);
  console.log(cartItem);
  return (
    <>
      {cartItem.map((book) => {
        console.log(book);
        return <CartItem key={book.id} book={book} />;
      })}
      <h1>Grand Total:{total}</h1>
    </>
  );
};

export default Bag;
