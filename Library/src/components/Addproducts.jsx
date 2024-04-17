/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { CREATE_BOOK } from "../GraphQl/Mutation";
import { useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";
import { authState } from "../features/authentication/authSlice";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const FormComponent = () => {
  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef(null);
  const titleRef = useRef();
  const priceRef = useRef();
  const authorRef = useRef();
  const quantityRef = useRef();
  const auth = useSelector(authState);
  const [createBookMutation] = useMutation(CREATE_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        // Add other headers as needed
      },
    },
  });
  const handleTitleChange = (e) => {};

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    setPhoto(URL.createObjectURL(file)); // Use the uploaded photo as URL
  };

  const handleCloudClick = () => {
    photoInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    console.log(
      "Zzzzzzzzzzzzzz",
      authorRef.current.value,
      !authorRef.current.value,
      auth
    );
    e.preventDefault();
    try {
      if (!titleRef.current.value || !titleRef.current.value.trim()) {
        showToast("please fill titile");
        return;
      }
      if (!authorRef.current.value || !authorRef.current.value.trim()) {
        showToast("please fill author name");
        return;
      }
      if (!priceRef.current.value || !priceRef.current.value.trim()) {
        showToast("please fill price");
        return;
      }
      const price = priceRef.current.value.trim() * 1;
      if (!Number.isInteger(price)) {
        showToast("price will be numeric string");
      }
      if (!quantityRef.current.value || !quantityRef.current.value.trim()) {
        showToast("please fill quantity");
      }
      const quantity = quantityRef.current.value.trim() * 1;
      if (!Number.isInteger(quantity)) {
        showToast("quantity should be a number");
        return;
      }

      const title = titleRef.current.value.trim();
      const author = authorRef.current.value.trim();
      console.log(title, price, author);
      const response = await createBookMutation({
        variables: {
          title,
          price,
          author,
          quantity,
        },
      });
    } catch (error) {
      console.log(error);
    }

    // Handle form submission here, e.g., send data to backend
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

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      justifyContent="center"
      alignItems="center"
      margin="auto"
      marginTop={10}
    >
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb="4">
          <FormLabel>Title</FormLabel>
          <Input ref={titleRef} type="text" onChange={handleTitleChange} />
        </FormControl>

        <FormControl id="author" mb="4">
          <FormLabel>Author</FormLabel>
          <Input ref={authorRef} type="text" />
        </FormControl>

        <FormControl id="price" mb="4">
          <FormLabel>Price</FormLabel>
          <Input ref={priceRef} type="number" />
        </FormControl>

        <FormControl id="quantity" mb="4">
          <FormLabel>Quantity</FormLabel>
          <Input ref={quantityRef} type="number" />
        </FormControl>

        <FormControl id="photo" mb="4" style={{ display: "none" }}>
          <Input type="file" ref={photoInputRef} onChange={handlePhotoChange} />
        </FormControl>
        <div className=" flex gap-8 ">
          {photo ? (
            <div
              className="w-16 h-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${photo})` }}
            ></div>
          ) : (
            <Button onClick={handleCloudClick} width={16} height={20}>
              <CloudUploadIcon />
            </Button>
          )}

          <Button type="submit" colorScheme="blue" mt="4">
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default FormComponent;
