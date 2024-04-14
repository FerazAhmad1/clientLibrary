/* eslint-disable react/prop-types */
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ children, ...rest }) => {
  return <ChakraButton {...rest}>{children}</ChakraButton>;
};

export default Button;
