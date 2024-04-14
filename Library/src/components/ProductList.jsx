/* eslint-disable react/prop-types */

import { Box, Image } from "@chakra-ui/react";

function ProductList({ products }) {
  return (
    <div>
      <div className="flex flex-wrap gap-6 md:gap-16">
        {products.map((product) => (
          <Box
            key={product.id}
            p={4}
            m={2}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
          >
            <h3>{product.title}</h3>
            {console.log(product.image)}
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                maxW="200px"
                maxH="300px"
              />
            ) : (
              <Box w="200px" h="300px" bg="pink" />
            )}
            <p>Author: {product.author}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
