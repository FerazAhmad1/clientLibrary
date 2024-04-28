/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Input, position } from "@chakra-ui/react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authentication/authSlice.jsx";
import { useMutation } from "@apollo/client";
import { SEARCH_BOOK } from "../GraphQl/Mutation.jsx";
import { useSelector } from "react-redux";
import { authState } from "../features/authentication/authSlice.jsx";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AsyncSelect from "react-select/async";

function Navbar() {
  const inputHeight = "40px";

  const signalRef = useRef(new AbortController());
  const timerRef = useRef();
  const selected = useRef();
  const navigate = useNavigate();

  const navRef = useRef();
  const dispatch = useDispatch();
  const [postion, setPosition] = useState("");
  const { token } = useSelector(authState);

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
  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const searcher = (callback, search) => {
    const query = search.trim();
    searchBook({
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
      if (!data.data.searchBook.available) {
        showToast("Not Found");
        return callback([]);
      }
      const options =
        data?.data?.searchBook?.Book.map((book) => {
          console.log(book);
          return {
            value: book.id,
            label: book.title,
          };
        }) || [];
      callback(options);
    });
  };

  const searchHandler = () => {
    if (!selected.current) return;
    const { value } = selected.current;
    navigate(`${value}`);
  };

  const customeDropdownIndicator = () => <div className="none" />;
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
            <Box mr={4} className="flex flex-1  ">
              <AsyncSelect
                cacheOptions
                loadOptions={(inputValue, callback) => {
                  const query = inputValue.trim();
                  if (query.length === 0) return;
                  signalRef.current.abort();
                  signalRef.current = new AbortController();
                  clearTimeout(timerRef.current);
                  timerRef.current = setTimeout(
                    searcher,
                    1000,
                    callback,
                    query
                  );
                }}
                placeholder="Search..."
                className="bg-inherit border-none w-80 "
                components={{
                  DropdownIndicator: customeDropdownIndicator,
                  IndicatorSeparator: () => <div style={{ display: "none" }} />,
                }}
                onChange={(selectedOption) => {
                  console.log("Selected:", selectedOption);
                  selected.current = selectedOption;
                }}
              />
              <Button
                bg="blue.500"
                color="white"
                border={"none"}
                _hover={{ bg: "blue.600" }}
                onClick={searchHandler}
              >
                <SearchIcon width={30} height={30} />
              </Button>
            </Box>
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
      <ToastContainer />
    </Box>
  );
}

export default Navbar;
