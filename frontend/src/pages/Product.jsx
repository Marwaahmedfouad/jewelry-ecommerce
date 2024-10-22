import React, { useEffect } from "react";
import { fetchProducts } from "../Redux/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/Product.module.css";

function Product() {
  const dispatch = useDispatch();
  const { products, isloading, error } = useSelector(
    (state) => state.ProductsRedux
  );
  useEffect(() => {
    dispatch(fetchProducts());
    
    console.log(products);
  }, [dispatch]);



  return (
    <div>
      {isloading ? (
        ""
      ) : (
        <div className="container">
          <div className="text-center">
            <h1>Shop by category</h1>
            <h5>Indulge in what we offer.</h5>
          </div>
          <section className={` container d-flex my-5`}>
            <div className={` row productCart`}>
              {products.map((p, index) => (
                <div
                  className={`${styles.productCart} col-md-3 mb-3`}
                  style={{ cursor: "pointer", overflow: "hidden" }}
                  key={index}
                >
                  <Link
                    to={`ProductDetail/${p.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className={`card h-100 shadow`}>
                      <div className={`card-body`}>
                        <h5 className="card-title"> {p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">{p.price}EGP</p>
                      </div>
                      <div className="m-auto">
                        <button
                          className={`${styles.buttonCart}`}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Product;
