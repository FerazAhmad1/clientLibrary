import ProductList from "./ProductList";

const Product = () => {
  const products = [
    {
      title: "Book 1",
      author: "Author 1",
      price: 10.99,
      quantity: 5,
    },
    {
      title: "Book 2",
      author: "Author 2",
      price: 15.99,
      quantity: 10,
    },
    {
      title: "Book 3",
      author: "Author 3",
      price: 7.89,
      quantity: 10,
    },
    {
      title: "Book 4",
      author: "Author 4",
      price: 8.99,
      quantity: 10,
    },
    // Add more product objects as needed
  ];

  return (
    <div>
      <h1>My Bookstore</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Product;
