import ImageSlider from "./ImageSlider";
import Button from "./Button";
import { useState, useEffect } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
function ProductDetail() {
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

  const addToCart=()=>{
    
  }

  const book = {
    id: 1,
    title: "Heat and mass transfer",
    price: 100,
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
          <Box p={2} textColor={"red"}>
            <h1>Title: {book.title}</h1>
            <h1>Price: {book.price}$</h1>
          </Box>
          <Box mb={4}>
            <Flex alignItems="center">
              <IconButton
                background="transparent"
                aria-label="Minus"
                icon={<MinusIcon />}
                size="xs"
                color="black"
                onClick={() => dcreaseCount()}
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

              <IconButton
                background="transparent"
                aria-label="Plus"
                icon={<PlusIcon />}
                size="xs"
                color="black"
                onClick={() => increaseCount()}
                marginRight="2"
              />
              <Button
                colorScheme="blue"
                size="xs"
                onClick={() => console.log("Button clicked")}
              >
                {" "}
                Remove{" "}
              </Button>
            </Flex>
          </Box>

          <Box>
            <Button>AddToCart</Button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
