/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Input, position } from "@chakra-ui/react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function Navbar() {
  const inputHeight = "40px";
  const navRef = useRef();
  const [postion, setPosition] = useState("");
  const obsCallBack = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      // setPosition("fixed");
      console.log("if ");
    } else {
      // setPosition("");
      console.log("else");
    }
  };
  const obsOption = {
    root: null,
    threshold: 0,
  };

  useEffect(() => {
    console.log("i am useEffect");
    const observer = new IntersectionObserver(obsCallBack, obsOption);

    if (navRef.current) {
      observer.observe(navRef.current);
    }
  }, []);

  return (
    <Box ref={navRef} bg="gray.800" p={4} style={{ position: postion }}>
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        alignItems="center"
        justifyContent="space-between"
        h={16}
      >
        <Box>
          <span className="text-white text-2xl font-bold">Book House</span>
        </Box>

        <Flex>
          <Box mr={4} className="flex">
            <Input
              type="text"
              placeholder="Search..."
              roundedLeft="md"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              style={{ borderRight: "None" }}
              height={inputHeight}
              color={"whitesmoke"}
            />

            <Button
              bg="blue.500"
              color="white"
              px={4}
              py={1}
              roundedRight="md"
              _hover={{ bg: "blue.600" }}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              height={"40px"}
            >
              <SearchIcon width={30} height={30} />
            </Button>
          </Box>
          <Flex alignItems="center" justifyContent="space-between">
            <Button color="black">
              <ViewListIcon className="h-6 w-6" />
            </Button>
            <Button color="black" ml={4}>
              <ShoppingCartIcon className="h-6 w-6" />
            </Button>
            <Box
              borderRadius={4}
              ml={4}
              bg="white"
              padding={2}
              alignItems="center"
            >
              <NavLink to="/addbooks">Add Books</NavLink>
            </Box>
            <Button color="black" ml={4}>
              <UserIcon className="h-6 w-6" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
