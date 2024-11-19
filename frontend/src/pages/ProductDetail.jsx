import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../Redux/ProductsSlice";
import { addToCart } from "../Redux/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ProductsRedux.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 })); // Add 1 item to cart by default
  };

  // Check if products are loaded and filter the product by id
  const filterProduct = products.length > 0 ? products.filter((p) => p.id === parseInt(id)) : [];
  const product = filterProduct.length > 0 ? filterProduct[0] : null;

  if (!product) {
    return <p>Loading product details...</p>; // Handle loading state
  }

  return (
    <div>
      <div className="container py-5">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price} EGP</p>
        <div className="py-3">
          <button className="btn btn-outline-success px-5 py-2 mx-2" onClick={() => handleAddToCart(product.id)}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
