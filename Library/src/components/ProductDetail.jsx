/* eslint-disable no-unused-vars */
import ImageSlider from "./ImageSlider";
import Button from "./Button";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { READ_BOOK } from "../GraphQl/Queries.jsx";
import { authState } from "../features/authentication/authSlice.jsx";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../GraphQl/Mutation.jsx";
import { useSelector } from "react-redux";
import Bookdetail from "./Bookdetail.jsx";
import ButtonIcon from "./ButtonIcon.jsx";

function ProductDetail() {
  const { id } = useParams();
  const { token } = useSelector(authState);
  const [borrowBuy, setBorrowbuy] = useState();
  const [duration, setDuration] = useState(1);
  const [addToCart] = useMutation(ADD_TO_CART, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const { loading, error, data } = useQuery(READ_BOOK, {
    variables: { id },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const [imageUrls, setImageUrls] = useState([]);
  let [count, setCount] = useState(1);

  const increaseCount = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };

  const dcreaseCount = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  const addToCartHandler = async (id, quantity, isBorrowed, duration) => {
    const response = await addToCart({
      variables: {
        id,
        quantity,
        isBorrowed: isBorrowed === "Borrow",
        duration: isBorrowed === "Borrow" ? `${duration}` : "LIFETIME",
      },
    });

    console.log(response, "rrrrrrrrrrrrrrrrrrrrrrr");
  };

  const book = {
    id: 1,
    title: "Heat and mass transfer",
    price: 100,
  };

  const buyTypeHandler = (value) => {
    console.log(value);
    setBorrowbuy(value);
  };
  // Simulated fetch of image URLs
  useEffect(() => {
    // Simulated fetch delay
    const timeout = setTimeout(() => {
      // Replace the placeholder colors with actual image URLs
      const fetchedImageUrls = [
        { color: "red", url: "image1.jpg" },
        { color: "blue", url: "image2.jpg" },
        { color: "green", url: "image3.jpg" },
        { color: "yellow", url: "image4.jpg" },
        { color: "orange", url: "image5.jpg" },
      ];
      setImageUrls(fetchedImageUrls);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <div className="flex items-center p-5 ">
        <div>
          <ImageSlider images={imageUrls} />
        </div>
        <div className="p-5">
          <Bookdetail
            data={(data && data.readBook && [{ ...data.readBook }]) || ""}
          />
          <Box mb={4}>
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
            <RadioGroup
              className="flex gap-4"
              onChange={buyTypeHandler}
              value={borrowBuy}
            >
              <Radio value="Borrow">Borrow</Radio>
              <Radio value="Buy">Buy</Radio>
            </RadioGroup>
            {borrowBuy === "Borrow" && (
              <Box mt={4}>
                <Flex alignItems="center">
                  <label htmlFor="duration" className="mr-2">
                    Duration:
                  </label>
                  <Select
                    id="duration"
                    value={duration}
                    onChange={handleDurationChange}
                  >
                    {[1, 2, 3].map((month) => (
                      <option key={month} value={month}>
                        {month} month{month > 1 && "s"}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Box>
            )}
          </Box>

          <Box>
            <Button
              clickHandler={() => {
                addToCartHandler(id, count, borrowBuy, duration);
                console.log(typeof `${duration}`);
              }}
            >
              AddToCart
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
