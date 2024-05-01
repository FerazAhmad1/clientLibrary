/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Bookdetail from "./Bookdetail";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import ButtonIcon from "./ButtonIcon";
import { useSelector } from "react-redux";
import { authState } from "../features/authentication/authSlice";
import Button from "./Button";
import { useQuery } from "@apollo/client";
import { READ_CART } from "../GraphQl/Queries";

const CartItem = ({ book }) => {
  let [count, setCount] = useState(book.quantity * 1);
  const increaseCount = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };

  const dcreaseCount = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };
  console.log(book);
  return (
    <Box bg="gray.300" marginBottom="10px" padding={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box width="150px" height="150px" bg="pink" />
        <Box>
          <Bookdetail data={[{ ...book }]} />
          <Flex alignItems="center">
            <ButtonIcon
              background="transparent"
              aria-label="Minus"
              icon={<MinusIcon />}
              size="xs"
              color="black"
              clickHandler={() => dcreaseCount(book.id)}
              marginRight="2"
            />
            <Box
              width="40px"
              height="40px"
              bg="white"
              boxShadow="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginRight="2"
              borderRadius="5px"
            >
              {count}
            </Box>
            <ButtonIcon
              background="transparent"
              aria-label="Plus"
              icon={<PlusIcon />}
              size="xs"
              color="black"
              clickHandler={() => increaseCount(book.id)}
              marginRight="2"
            />
            <Button
              colorScheme="red"
              size="xs"
              onClick={() => console.log("Button clicked")}
            >
              Remove
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(CartItem);
