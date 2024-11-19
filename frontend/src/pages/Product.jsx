// import React, { useEffect } from "react";
// import { fetchProducts } from "../Redux/ProductsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import styles from "../styles/Product.module.css";

// function Product() {
//   const dispatch = useDispatch();
//   const { products, isloading, error } = useSelector(
//     (state) => state.ProductsRedux
//   );

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleAddToCart = (id) => {
//     console.log(id);
//   };

//   return (
//     <div>
//       {isloading ? (
//         ""
//       ) : (
//         <div className="container">
//           <div className="text-center">
//             <h1>Shop by category</h1>
//             <h5>Indulge in what we offer.</h5>
//           </div>
//           <section className="container d-flex my-5">
//             <div className="row">
//               {products.map((p, index) => (
//                 <div
//                   className={`${styles.productCard} col-md-3 mb-3 position-relative`} // Add position-relative for button positioning
//                   style={{ cursor: "pointer", overflow: "hidden" }}
//                   key={index}
//                 >
//                   <Link
//                     to={`ProductDetail/${p.id}`}
//                     style={{ textDecoration: "none" }}
//                   >
//                     <div className="card h-100 shadow">
//                       <div className="card-body">
//                         <h5 className="card-title">{p.name}</h5>
//                         <p className="card-text">{p.description}</p>
//                         <p className="card-text">{p.price} EGP</p>
//                         <h1>{p.id}</h1>
//                       </div>
//                     </div>
//                   </Link>
//                   {/* "Add To Cart" button */}
//                   <button
//                     className={`${styles.buttonCart}`}
//                     onClick={() => handleAddToCart(p.id)}
//                   >
//                     Add To Cart
//                   </button>

             
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Product;
import React, { useEffect } from "react";
import { fetchProducts } from "../Redux/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/Product.module.css";
import { addToCart, AddToCartReducer } from "../Redux/AddToCartSlice";


function Product() {
  const dispatch = useDispatch();
  const { CartsData, isLoading } = useSelector((state) => state.getCart);
  const { products, isloading, error } = useSelector(
    (state) => state.ProductsRedux
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const quantity = 1; 
    dispatch(addToCart({ productId, quantity }));
  };

  return (
    <div>
      {isloading ? (
        "Loading..."
      ) : (
        <div className="container">
          <div className="text-center">
            <h1>Shop by category</h1>
            <h5>Indulge in what we offer.</h5>
          </div>
          <section className="container d-flex my-5">
            <div className="row">
              {products.map((p, index) => (
                <div
                  className={`${styles.productCard} col-md-3 mb-3 p-1 position-relative `}
                  style={{ cursor: "pointer", overflow: "hidden" }}
                  key={index}
                >

                  <Link
                    to={`ProductDetail/${p.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card h-100 shadow pb-5">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">{p.price} EGP</p>
                      </div>
                    </div>productCard
                  </Link>
                  <button
                    className={`${styles.buttonCart}`}
                    onClick={() => handleAddToCart(p.id)} 
                  >
                    Add To Cart
                  </button>
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
