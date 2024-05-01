/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box } from "@chakra-ui/react";
const Bookdetail = ({ data }) => {
  console.log(data);
  if (data === "") return <div />;
  return (
    <>
      {data.map((data) => {
        return (
          <Box p={2} textColor={"red"}>
            <h1>Title: {data && data.title}</h1>
            <h1>
              Author:
              {data && data.author}
            </h1>
            <h1>Price: {data && data.price}$</h1>
            {data && data.quantity && <h1>Quantity:{data.quantity}</h1>}
            {data && data.hasOwnProperty("isBorrowed") && (
              <h1>Type:{data.isBorrowed ? "Borrow" : "Buy"}</h1>
            )}
            {data && data.isBorrowed && (
              <h1>
                Duration:{data.duration * 1} month{data.duraion * 1 > 1 && "s"}{" "}
              </h1>
            )}
            {data && data.total && <h1>Total:{data.total}</h1>}
          </Box>
        );
      })}
    </>
  );
};

export default React.memo(Bookdetail);
