/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Bookdetail from "./Bookdetail";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import ButtonIcon from "./ButtonIcon";
import Button from "./Button";
const Bag = () => {
  let [count, setCount] = useState(1);

  const book = {
    title: "Heat and mass transfer",
    price: 500,
    author: "cengel and cimbala",
    quantity: 10,
    total: 5000,
  };
  const increaseCount = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };

  const dcreaseCount = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };
  return (
    <Box padding={4}>
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
              clickHandler={dcreaseCount}
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
              clickHandler={increaseCount}
              marginRight="2"
            />
            <Button
              colorScheme="red"
              size="xs"
              onClick={() => console.log("Button clicked")}
            >
              {" "}
              Remove{" "}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Bag;
