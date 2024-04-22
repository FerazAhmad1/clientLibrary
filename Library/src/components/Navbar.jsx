/* eslint-disable react-hooks/exhaustive-deps */
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
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authentication/authSlice.jsx";
import { useMutation } from "@apollo/client";
import { SEARCH_BOOK } from "../GraphQl/Mutation.jsx";
import { useSelector } from "react-redux";
import { authState } from "../features/authentication/authSlice.jsx";
import AsyncSelect from "react-select/async";

function Navbar() {
  const inputHeight = "40px";

  const signalRef = useRef(new AbortController());
  const timerRef = useRef();

  const navRef = useRef();
  const dispatch = useDispatch();
  const [postion, setPosition] = useState("");
  const { token } = useSelector(authState);

  const [search, setSearch] = useState("");
  const [searchBook] = useMutation(SEARCH_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

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

  const logOutHandler = (e) => {
    dispatch(logout());
  };
  const searchHandler = (e) => {
    console.log("yes i am running");
    setSearch(e.target.value);
  };

  const searcher = () => {
    const query = search.trim();
    return searchBook({
      variables: {
        query,
      },
      context: {
        fetchOptions: {
          signal: signalRef.current.signal,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }).then((data) => {
      return data.data.searchBook.Book;
    });
  };

  useEffect(() => {
    if (search.trim().length === 0) return;
    signalRef.current.abort();
    signalRef.current = new AbortController();
    timerRef.current = setTimeout(searcher, 1000);
    return () => clearTimeout(timerRef.current);
  }, [search]);

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
              onChange={searchHandler}
              value={search}
            />
            <Box mr={4} className="flex">
              <AsyncSelect
                cacheOptions
                loadOptions={searcher || Promise.resolve()}
                placeholder="Search..."
                onChange={(selectedOption) => {
                  console.log("Selected:", selectedOption);
                }}
              />
            </Box>
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
            <Menu>
              <MenuButton bgColor="white" borderRadius={4} ml={4} padding={2}>
                <UserIcon className="h-6 w-6" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logOutHandler}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
