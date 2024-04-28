/* eslint-disable react/prop-types */
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ children, clickHandler, ...rest }) => {
  return (
    <ChakraButton onClick={clickHandler} {...rest}>
      {children}
    </ChakraButton>
  );
};

export default Button;
