import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../Redux/ProductsSlice";
import { addToCart } from "../Redux/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let products = useSelector((state) => state.ProductsRedux.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const filterProduct = products.filter((p) => p.id === parseInt(id));
  // console.log(filterProduct);
  // const newarray = filterProduct[0];
   


 // Check if products are loaded and filter the product by id
 const filterProduct = products.length > 0 ? products.filter((p) => p.id === parseInt(id)) : [];
 const newarray = filterProduct.length > 0 ? filterProduct[0] : null;


  return (
    <div>
      <div className="container py-5">
        <h1>{newarray.name}</h1>
        <p>{newarray.description}</p>
        <p>{newarray.price} EGP</p>
        <div className="py-3">
          <button className="btn btn-outline-success px-5 py-2 mx-2" onClick={()=>dispatch(addToCart(newarray))}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
