import React, { useEffect } from "react";
import { fetchProducts } from "../Redux/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { products, isloading, error } = useSelector(
    (state) => state.ProductsRedux
  );
  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products);
  }, [dispatch]);
  return (
    <>
      <section className="HomeImage text-white vh-100 d-flex flex-column px-5 justify-content-center gap-3">
        <h2>the autumn equinox</h2>
        <h6>Fall has arrived. Shop for our new releases starting today.</h6>
        <div className="">
          <button
            className="btn btn-outline-light text-white"
            style={{ width: "10%" }}
          >
            Shop Now
          </button>
        </div>
      </section>
      {isloading ? (
        ""
      ) : (
        <div className="container">
          <div className="text-center">
            <h1>Shop by category</h1>
            <h5>Indulge in what we offer.</h5>
          </div>
          <section className="container d-flex my-5">
            <div className="row ">



     
             {products.map((p, index) => (
                  <div className="col-md-3 mb-3" style={{cursor:'pointer'}} key={index}>
           <Link to={`ProductDetail/${p.id}`}>
           <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title"> {p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">{p.price}EGP</p>
                      </div>
                    </div>
           </Link>
                  </div>
              ))} 

            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Home;

