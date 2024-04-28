/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
const ButtonIcon = ({ clickHandler, ...props }) => {
  return <IconButton {...props} onClick={clickHandler} />;
};

export default ButtonIcon;
